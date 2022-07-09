import GameWindow from '../../libs/GameWindow'
import Sprite from '../../libs/Sprite'
import FieldView from '../components/engine/FieldView'
import LayoutHelper from '../../libs/LayoutHelper'

export default class Scene extends GameWindow {
  constructor() {
    super()

    this.field = null
    this.score = null

    this.createChildren()
    this.subscribe()
  }

  static Events = {
    exit: 'exit-btn-clicked'
  }

  createChildren() {
    this.field = this.addChild(new FieldView())
    this.field.scale.set(1.5)

    this.exit = this.addChild(new Sprite('menu/out'))
  }

  subscribe() {
    this.exit.on('pointerdown', this.onExit, this)
  }

  onExit() {
    this.emit(Scene.Events.exit)
  }

  onResize() {
    const { right, top } = LayoutHelper

    this.exit.position.set(right - this.exit.width / 1.8, top + this.exit.height / 1.8)
  }
}
