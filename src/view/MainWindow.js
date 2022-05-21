import Game from '../Game'
import GameWindow from '../../libs/GameWindow'
import MySprite from '../../libs/MySprite'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.background = null

    this.fieldModel = null
    this.fieldView = null

    this.createChildren()
  }

  createChildren() {
    this.background = this.addChild(new MySprite('background'))
    console.log(this.background.width)
  }

  onResize() {}
}
