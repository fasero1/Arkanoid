export default class FieldModel {
  constructor(matrix) {
    this.matrix = matrix || this.createDefaultMatrix()

    this.width = this.matrix[0].length
    this.height = this.matrix.length

    this.necessaryTokens = this.getAllTokens().length
  }

  createDefaultMatrix() {
    return [
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
      [4, 3, 1, 5, 4],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2]
    ]
  }

  pushToken(row, col, token) {
    this.matrix[row][col] = token
    token.row = row
    token.col = col
  }

  swapTokens(tokens) {
    const [t1, t2] = tokens

    const { row: row1, col: col1 } = t1
    const { row: row2, col: col2 } = t2

    if (
      (row1 === row2 && (col1 - 1 === col2 || col1 + 1 === col2)) ||
      (col1 === col2 && (row1 - 1 === row2 || row1 + 1 === row2))
    ) {
      this.pushToken(row1, col1, t2)
      this.pushToken(row2, col2, t1)

      if (this.matrixCheck().length > 0) {
        return true
      }

      this.pushToken(row1, col1, t1)
      this.pushToken(row2, col2, t2)

      return false
    }

    return false
  }

  isTokensNear(t1, t2) {
    const { row: row1, col: col1 } = t1
    const { row: row2, col: col2 } = t2

    if (
      (row1 === row2 && (col1 - 1 === col2 || col1 + 1 === col2)) ||
      (col1 === col2 && (row1 - 1 === row2 || row1 + 1 === row2))
    ) {
      return true
    }

    return false
  }

  matrixCheck() {
    const combinations = []

    for (let row = 0; row < this.height; row++) {
      const line = this.getHorizontalLine(row)
      combinations.push(...this.lineCheck(line))
    }

    for (let col = 0; col < this.width; col++) {
      const line = this.getVerticalLine(col)
      combinations.push(...this.lineCheck(line))
    }

    return combinations
  }

  lineCheck(line) {
    const combinations = []

    let matchColor = null

    let firstTokenIndex = 0
    let lastTokenIndex = 0

    for (let i = 0; i < line.length; i++) {
      const isLastToken = i === line.length - 1
      const isBorder = line[i] === -1

      if (line[i].type !== matchColor || isBorder || isLastToken) {
        matchColor = line[i].type

        lastTokenIndex = i
        if (isLastToken && line[i].type === line[i - 1].type) lastTokenIndex = i + 1
        // if (isBorder) lastTokenIndex = i - 1

        if (lastTokenIndex - firstTokenIndex >= 3) {
          combinations.push(line.slice(firstTokenIndex, lastTokenIndex))
        }

        firstTokenIndex = i
      }
    }

    return combinations
  }

  move() {
    let move = true

    while (move) {
      move = false

      for (let col = 0; col < this.width; col++) {
        const line = this.getVerticalLine(col)
        line.sort((a, b) => {
          if (a === null && b === null) return 0
          if (a === null) return -1
          if (b === null) return 1
        })
        this.changeVerticalLine(col, line)
      }
    }
  }

  changeVerticalLine(index, newLine) {
    for (let i = 0; i < this.matrix.length; i++) {
      const token = newLine[i]

      this.matrix[i][index] = token
      if (token !== null) token.row = i
    }
  }

  destroyToken(row, col) {
    this.matrix[row][col] = null
  }

  getHints() {
    let combinations = []

    for (let row = 0; row < this.height; row++) {
      const line = this.getHorizontalLine(row)
      combinations.push(...this.lineHintCheck(line))
    }

    for (let col = 0; col < this.width; col++) {
      const line = this.getVerticalLine(col)
      combinations.push(...this.lineHintCheck(line))
    }

    const uniq = []

    for (let i = 0; i < combinations.length; i++) {
      const arr = combinations[i]

      const uniqIndex = uniq.findIndex((uniqArr) => {
        return (
          (uniqArr[0].row === arr[0].row &&
            uniqArr[0].col === arr[0].col &&
            uniqArr[1].row === arr[1].row &&
            uniqArr[1].col === arr[1].col) ||
          (uniqArr[0].row === arr[1].row &&
            uniqArr[0].col === arr[1].col &&
            uniqArr[1].row === arr[0].row &&
            uniqArr[1].col === arr[0].col)
        )
      })

      if (uniqIndex === -1) {
        uniq.push(arr)
        // console.log(arr[0].row, arr[0].col, '-----', arr[1].row, arr[1].col)
      }
    }

    return uniq
  }

  lineHintCheck(line) {
    const hints = []

    let matchColor = null

    let firstTokenIndex = 0
    let lastTokenIndex = 0

    for (let i = 0; i < line.length; i++) {
      const isLastToken = i === line.length - 1
      const isBorder = line[i] === -1

      if (line[i].type !== matchColor || isBorder || isLastToken) {
        matchColor = line[i].type

        lastTokenIndex = i
        if (isLastToken && line[i].type === line[i - 1].type) lastTokenIndex = i + 1

        if (lastTokenIndex - firstTokenIndex >= 2) {
          lastTokenIndex--

          if (firstTokenIndex - 1 >= 0) {
            hints.push(...this.findSimilar(line[firstTokenIndex], line[firstTokenIndex - 1]))
          }
          if (lastTokenIndex + 1 < line.length) {
            hints.push(...this.findSimilar(line[lastTokenIndex], line[lastTokenIndex + 1]))
          }
        }

        firstTokenIndex = i
      }
    }

    return hints
  }

  findSimilar(prevToken, nextToken) {
    const similar = []
    const hints = []

    const { col, row } = nextToken
    const { type } = prevToken

    if (this.matrix[row + 1]?.[col]?.type === type) similar.push(this.matrix[row + 1][col])
    if (this.matrix[row - 1]?.[col]?.type === type) similar.push(this.matrix[row - 1][col])
    if (this.matrix[row]?.[col + 1]?.type === type) similar.push(this.matrix[row][col + 1])
    if (this.matrix[row]?.[col - 1]?.type === type) similar.push(this.matrix[row][col - 1])

    for (let i = 0; i < similar.length; i++) {
      const token = similar[i]
      if (token.row === prevToken.row && token.col === prevToken.col) {
        continue
      }

      hints.push([token, nextToken])
    }

    return hints
  }

  getVerticalLine(index) {
    const line = []

    for (let i = 0; i < this.matrix.length; i++) {
      line.push(this.matrix[i][index])
    }

    return line
  }

  getHorizontalLine(index) {
    return this.matrix[index]
  }

  getEmptyPositions() {
    const emptyPositions = []

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.matrix[row][col] === null) {
          emptyPositions.push({ row, col })
        }
      }
    }

    return emptyPositions
  }

  shuffle() {
    console.log('SHUFFLE')

    const tokens = this.getAllTokens()
    for (let i = tokens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = tokens[i]
      tokens[i] = tokens[j]
      tokens[j] = temp
    }

    let counter = 0
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.pushToken(row, col, tokens[counter])
        counter++
      }
    }
  }

  getAllTokens() {
    const tokens = []

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const token = this.matrix[i][j]
        if (token !== -1 && token !== null) {
          tokens.push(token)
        }
      }
    }

    return tokens
  }
}
