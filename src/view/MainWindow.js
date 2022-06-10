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
      [3, 4, 5, 1, 2],
      [3, 4, 2, 3, 2],
      [4, 3, 1, 5, 4],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2]
    ]

    this.field = this.addChild(new FieldView(fieldMatrix))
    this.field.scale.set(1.3)

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
