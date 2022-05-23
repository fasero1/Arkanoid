import Container from '../Container'
import Sprite from '../Sprite'
import FieldModel from './FieldModel'
import TokenView from './TokenView'

export default class FieldView extends Container {
  constructor(matrix, props) {
    super()

    this.model = new FieldModel(matrix)

    this.plateSize = props?.size || 100

    this.startCordX = -((this.plateSize * this.model.matrix[0].length) / 2 - this.plateSize / 2)
    this.startCordY = -((this.plateSize * this.model.matrix.length) / 2 - this.plateSize / 2)

    this.bordersContainer = null
    this.tokensContainer = null

    this.tokens = []

    this.createBackground()
    this.createTokens()
    this.subscribe()
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

        if (borders.top) {
          const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
          sprite.width = 100
          sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)
          sprite.rotation = Math.PI
          sprite.position.y -= this.plateSize / 2 + sprite.height / 2
        }

        if (borders.bottom) {
          const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
          sprite.width = 100
          sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)
          sprite.rotation = 0
          sprite.position.y += this.plateSize / 2 + sprite.height / 2
        }

        if (borders.left) {
          const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
          sprite.width = 100
          sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)
          sprite.rotation = Math.PI * 0.5
          sprite.position.x -= this.plateSize / 2 + sprite.height / 2
        }

        if (borders.right) {
          const sprite = this.bordersContainer.addChild(new Sprite('borders/border'))
          sprite.width = 100
          sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)
          sprite.rotation = Math.PI * -0.5
          sprite.position.x += this.plateSize / 2 + sprite.height / 2
        }

        // if (borders.topLeftAngle) {
        //   const sprite = this.bordersContainer.addChild(new MySprite('borders/border-angle'))
        //   ancho
        //   // sprite.width = sprite.height = 100
        //   sprite.position.set(this.startCordX + col * this.plateSize, this.startCordY + row * this.plateSize)
        //   // sprite.rotation = Math.PI * -0.5
        //   sprite.position.x += sprite.width / 2 - this.plateSize / 2 - 50
        // }
      }
    }
  }

  createTokens() {
    const matrix = this.model.matrix

    this.tokensContainer = this.addChild(new Container())

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const token = this.tokensContainer.addChild(new TokenView(matrix[row][col]))
        token.row = row
        token.col = col

        token.width = token.height = this.plateSize - 10

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
      right: false,
      topLeftAngle: false,
      topRightAngle: false,
      bottomLeftAngle: false,
      bottomRightAngle: false
    }

    if (!matrix[row - 1] || matrix[row - 1][col] === -1) borders.top = true
    if (!matrix[row + 1] || matrix[row + 1][col] === -1) borders.bottom = true

    if (!matrix[row][col - 1] || matrix[row][col - 1] === -1) borders.left = true
    if (!matrix[row][col + 1] || matrix[row][col + 1] === -1) borders.right = true

    if (borders.top && borders.left) {
      borders.top = false
      borders.left = false
      borders.topLeftAngle = true
    }

    if (borders.top && borders.right) {
      borders.top = false
      borders.right = false
      borders.topRightAngle = true
    }

    if (borders.bottom && borders.left) {
      borders.bottom = false
      borders.left = false
      borders.bottomLeftAngle = true
    }

    if (borders.bottom && borders.right) {
      borders.bottom = false
      borders.right = false
      borders.bottomRightAngle = true
    }

    return borders
  }

  subscribe() {
    this.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown(e) {
    console.log(e)
  }
}
