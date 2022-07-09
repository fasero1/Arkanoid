import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import Text from '../../libs/Text'
import FieldView from '../components/engine/FieldView'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.createChildren()
    this.subscribe()
  }

  createChildren() {
    const field = this.addChild(new FieldView())
    this.text = this.addChild(new Text('0', { fontSize: 65 }))
  }

  subscribe() {}

  onResize() {
    const { gameWidth, gameHeight, isLandscape, aspectRatio } = LayoutHelper
    this.text.position.set(-300)
  }
}
