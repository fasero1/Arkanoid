import { Graphics } from 'pixi.js'
import Container from '../../libs/Container'
import Text from '../../libs/Text'

export default class Score extends Container {
  constructor() {
    super()

    this.createChildren()
  }

  createChildren() {
    const cfg = {
      fontSize: 60,
      fill: '#ff00ff'
    }

    const container = this.addChild(new Container())

    const bg = container.addChild(new Graphics().beginFill(0x000000).drawRect(-100, -50, 200, 100).endFill())
    bg.alpha = 0.7

    const text = container.addChild(new Text('93/100', cfg))
  }
}
