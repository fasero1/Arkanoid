import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import FieldView from '../../libs/engine/FieldView'

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
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3],
      [1, 5, 4, 3, 2, 3]
    ]

    this.field = this.addChild(new FieldView())
  }

  onResize() {
    const { gameWidth, gameHeight, isLandscape } = LayoutHelper

    if (isLandscape) {
    } else {
    }
  }
}
