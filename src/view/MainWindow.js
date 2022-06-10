import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import FieldView from '../../libs/engine/FieldView'
import Sprite from '../../libs/Sprite'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.background = null

    this.fieldModel = null
    this.fieldView = null

    this.createChildren()
  }

  createChildren() {
    const fieldMatrix = [
      [1, 1, 1, 3, 2, 2, 2],
      [1, 5, 4, 3, 2, 2, 2],
      [5, 1, 5, 1, 1, 2, 2],
      [1, 5, 4, 3, 2, 2, 2],
      [1, 5, 4, 3, 2, 2, 2]
    ]

    this.field = this.addChild(new FieldView(fieldMatrix))

    // const bg = this.addChild(new Sprite('background'))
    // bg.scale.set(0.4)
  }

  onResize() {
    const { gameWidth, gameHeight, isLandscape } = LayoutHelper

    if (isLandscape) {
    } else {
    }
  }
}
