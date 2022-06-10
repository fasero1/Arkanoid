export default class FieldModel {
  constructor(matrix) {
    this.matrix = matrix || this.createDefaultMatrix()

    this.width = matrix[0].length
    this.height = matrix.length
  }

  createDefaultMatrix() {
    return [
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
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
  }

  matrixCheck() {
    const matched = []

    for (let row = 0; row < this.matrix.length; row++) {
      const line = this.getHorizontalLine(row)
      const combinations = this.lineCheck(line)
      matched.push(combinations)
    }

    console.log(matched)
  }

  lineCheck(line) {
    const combinations = []

    let matchColor = null

    let firstTokenIndex = null
    let lastTokenIndex = null

    for (let i = 0; i < line.length; i++) {
      if (matchColor !== line[i].type) {
        matchColor = line[i].type
        lastTokenIndex = i

        if (lastTokenIndex - firstTokenIndex >= 3) combinations.push(line.slice(firstTokenIndex, lastTokenIndex))

        firstTokenIndex = i
      }

      if (i === line.length - 1) {
        lastTokenIndex = i + 1
        if (lastTokenIndex - firstTokenIndex >= 3) combinations.push(line.slice(firstTokenIndex, lastTokenIndex))
      }
    }

    return combinations
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
}
