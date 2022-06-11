import { Tween } from '@tweenjs/tween.js'
import Container from '../Container'
import Sprite from '../Sprite'
import FieldModel from './FieldModel'
import TokenView from './TokenView'

export default class FieldView extends Container {
  constructor(matrix, props) {
    super()

    this.model = new FieldModel(matrix)

    this.plateSize = props?.size || 100
    this.typesNumber = props?.typesNumber || 6

    this.bordersContainer = null
    this.tokensContainer = null

    this.selectedTokens = []

    this.tokens = []

    this._lock = false

    this.init()
  }

  init() {
    this.createBackground()
    this.createTokens()
    this.subscribe()

    this.update()
  }

  createBackground() {
    const matrix = this.model.matrix

    this.bordersContainer = this.addChild(new Container())
    this.bordersContainer.position.set((-this.plateSize * matrix.length) / 2 + this.plateSize / 2)

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        let texture = 'borders/plate-1'
        if ((row % 2 && col % 2 === 0) || (row % 2 === 0 && col % 2)) texture = 'borders/plate-2'
        if (matrix[row][col] === -1) continue

        const plate = this.bordersContainer.addChild(new Sprite(texture))

        plate.width = plate.height = 100

        plate.position.set(col * this.plateSize, row * this.plateSize)

        const borders = this.bordersCheck(row, col)
        this.drawBorders(borders, row, col)
      }
    }
  }

  drawBorders(borders, row, col) {
    for (const side in borders) {
      if (borders[side]) {
        const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
        sprite.position.set(col * this.plateSize, row * this.plateSize)

        const correction = this.plateSize / 2 + sprite.height / 2

        if (side === 'top' || side === 'bottom') {
          side === 'top' ? (sprite.y -= correction) : (sprite.y += correction)
        }
        if (side === 'left' || side === 'right') {
          sprite.rotation = Math.PI * 0.5
          side === 'left' ? (sprite.x -= correction) : (sprite.x += correction)
        }
      }
    }
  }

  createTokens() {
    const matrix = this.model.matrix

    this.tokensContainer = this.addChild(new Container())
    this.tokensContainer.position.set((-this.plateSize * matrix.length) / 2 + this.plateSize / 2)

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === -1) continue

        const token = this.tokensContainer.addChild(new TokenView(matrix[row][col]))
        token.position.set(col * this.plateSize, row * this.plateSize)

        this.model.pushToken(row, col, token)
      }
    }
  }

  bordersCheck(row, col) {
    const matrix = this.model.matrix
    const borders = {
      top: false,
      bottom: false,
      left: false,
      right: false
    }

    if (!matrix[row - 1] || matrix[row - 1][col] === -1) borders.top = true
    if (!matrix[row + 1] || matrix[row + 1][col] === -1) borders.bottom = true

    if (!matrix[row][col - 1] || matrix[row][col - 1] === -1) borders.left = true
    if (!matrix[row][col + 1] || matrix[row][col + 1] === -1) borders.right = true

    return borders
  }

  subscribe() {
    this.tokensContainer.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown(e) {
    if (this._lock) return

    const token = e.target
    token.onPointerDown()

    if (token.active) {
      this.selectedTokens.push(token)
    } else {
      this.selectedTokens = this.selectedTokens.filter((item) => item.col !== token.col && item.row !== token.row)
    }

    if (this.selectedTokens.length === 2) {
      this.makeSwap()
    }
  }

  makeSwap() {
    const [t1, t2] = this.selectedTokens

    this.selectedTokens.forEach((token) => token.onUnselect())
    if (this.model.isTokensNear(t1, t2)) {
      t1.moveTo(t2.x, t2.y)
      t2.moveTo(t1.x, t1.y).onComplete(() => {
        this.model.swapTokens(this.selectedTokens)
        this.update()

        this.selectedTokens = []
      })
    } else {
      this.selectedTokens = []
    }
  }

  destroyToken(token) {
    token.toDestroy = true
    token.onDestroy()

    this.model.destroyToken(token.row, token.col)

    if (token.relatedMatches.length > 1) {
      // logic for bouns tokens
    }
  }

  spawnNewTokens() {
    const newTokens = []

    const emptyPos = this.model.getEmptyPositions()

    for (let i = emptyPos.length - 1; i >= 0; i--) {
      const { row, col } = emptyPos[i]
      const type = Math.floor(Math.random() * (this.typesNumber + 1 - 1) + 1)
      const token = this.tokensContainer.addChild(new TokenView(type))
      token.position.set(col * this.plateSize, row * this.plateSize - this.model.height * this.plateSize)

      this.model.pushToken(row, col, token)

      newTokens.push(token)
    }

    return newTokens
  }

  lock() {
    this._lock = true
  }

  unLock() {
    this._lock = false
  }

  update() {
    if (this._lock) return
    const matches = this.model.matrixCheck()

    let lastDestroyedToken = null

    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < matches[i].length; j++) {
        const token = matches[i][j]
        token.relatedMatches.push(matches[i])
        this.destroyToken(token)

        lastDestroyedToken = token
      }
    }

    if (lastDestroyedToken !== null) {
      lastDestroyedToken.once('destroyed', () => {
        this.spawnNewTokens()

        this.model.move()
        this.update()
      })
    }

    this.tokens = this.model.getAllTokens()

    if (this.tokens.length < this.model.necessaryTokens) {
      this.model.move()
    }

    this.tokens.forEach((token) => {
      if (token.x / 100 !== token.col || token.y / 100 !== token.row) {
        token.moveTo(token.col * this.plateSize, token.row * this.plateSize)
      }
    })
  }
}
