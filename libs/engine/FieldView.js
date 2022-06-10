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

    this.startCordX = -((this.plateSize * this.model.width) / 2 - this.plateSize / 2)
    this.startCordY = -((this.plateSize * this.model.height) / 2 - this.plateSize / 2)

    this.bordersContainer = null
    this.tokensContainer = null

    this.selectedTokens = []

    this.tokens = []

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

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        let texture = 'borders/plate-1'
        if ((row % 2 && col % 2 === 0) || (row % 2 === 0 && col % 2)) texture = 'borders/plate-2'

        const plate = this.bordersContainer.addChild(new Sprite(texture))

        plate.width = plate.height = 100

        plate.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)

        const borders = this.bordersCheck(row, col)
        this.drawBorders(borders, row, col)
      }
    }
  }

  drawBorders(borders, row, col) {
    for (const side in borders) {
      if (borders[side]) {
        const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
        sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)

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

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const token = this.tokensContainer.addChild(new TokenView(matrix[row][col]))
        this.model.pushToken(row, col, token)

        token.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)

        this.tokens.push(token)
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
    const token = e.target
    token.onPointerDown()

    if (token.active) {
      this.selectedTokens.push(token)
    } else {
      this.selectedTokens = this.selectedTokens.filter((item) => item.col !== token.col && item.row !== token.row)
    }

    if (this.selectedTokens.length === 2) {
      this.onSwap()
    }
  }

  onSwap() {
    this.selectedTokens.forEach((token) => token.onUnselect())

    this.model.swapTokens(this.selectedTokens)

    this.selectedTokens = []
  }

  update() {
    this.model.matrixCheck()

    // console.log(this.model.matrix)
  }
}
