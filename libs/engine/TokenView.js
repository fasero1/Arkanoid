import { Tween } from '@tweenjs/tween.js'
import Container from '../Container'
import Sprite from '../Sprite'

export default class TokenView extends Container {
  constructor(type) {
    super()

    this.type = type
    this.view = null

    this.tweens = []

    this.active = false

    this.toDestroy = false
    this.matchedTokens = []

    this.interactive = true

    this.createChildren()
  }

  createChildren() {
    this.view = this.addChild(new Container())

    const sprite = this.view.addChild(new Sprite(`tokens/${this.type}`))
    sprite.width = sprite.height = 85

    this.view.addChild(sprite)
  }

  onPointerDown() {
    this.stopTweens()
    this.tweens = []

    if (this.active) {
      this.onUnselect()
    } else {
      this.onSelect()
    }
  }

  onSelect() {
    this.active = true

    const scaleTween = new Tween(this.view.scale).to({ x: 1.1, y: 1.1 }, 150).start()
    this.tweens.push(scaleTween)
  }

  onUnselect() {
    this.active = false

    const scaleTween = new Tween(this.view.scale).to({ x: 1, y: 1 }, 150).start()
    this.tweens.push(scaleTween)
  }

  stopTweens() {
    this.tweens.forEach((tween) => tween.stop())
  }
}
