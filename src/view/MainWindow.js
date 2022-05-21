import Game from '../Game'
import GameWindow from '../../libs/GameWindow'
import MySprite from '../../libs/MySprite'
import LayoutHelper from '../../libs/LayoutHelper'

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
  }

  onResize() {
    const { gameWidth, gameHeight, isLandscape } = LayoutHelper

    if (isLandscape) {
      this.background.width = gameWidth
      this.background.scale.y = this.background.scale.x
    } else {
      this.background.height = gameHeight
      this.background.scale.x = this.background.scale.y
    }
  }
}
