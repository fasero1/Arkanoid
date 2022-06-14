import Tween from '../../../libs/Tween'
import Container from '../../../libs/Container'
import Particles from '../../../libs/Particles'
import Sprite from '../../../libs/Sprite'
import { boom } from '../../../libs/StandartEmmiters'

export default class TokenView extends Container {
  constructor(type) {
    super()

    this.type = type
    this.view = null

    // прилітає коли ми пушимо токен в модель
    this.row = null
    this.col = null

    this.tweens = []

    this.active = false

    this.toDestroy = false
    this.relatedMatches = []

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

  onDestroy() {
    if (!this.toDestroy) return

    const particles = this.addChild(new Particles('particle', boom, true))

    const destroyTween = new Tween(this)
      .to({ alpha: 0 }, 350)
      .onComplete(() => this.destroy(false, true))
      .delay(150)
      .start()
  }

  moveTo(x, y) {
    return new Tween(this).to({ x: x, y: y }, 250).start()
  }

  stopTweens() {
    this.tweens.forEach((tween) => tween.stop())
  }
}
