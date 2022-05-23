import Container from '../Container'
import Sprite from '../Sprite'

export default class TokenView extends Container {
  constructor(type) {
    super()

    this.type = type

    this.view = null

    this.interactive = true

    this.createChildren()
  }

  createChildren() {
    this.view = this.addChild(new Sprite(`tokens/${this.type}`))
  }
}
