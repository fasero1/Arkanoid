import { Graphics, TextStyle, Text } from 'pixi.js'
import Container from '../../libs/Container'

export default class WinWindow extends Container {
  constructor() {
    super()

    this.winWindow
    const style = new TextStyle({
      fontFamily: 'Futura',
      fontSize: 64,
      fill: 'white'
    })
    this.message = new Text('You Win!', style)
    this.message.x = -120
    this.message.y = -100

    this.draw()
  }

  draw() {
    this.winWindow = new Graphics()
    this.winWindow.beginFill(0x000000)
    this.winWindow.drawRect(-600, -400, 1200, 800)
    this.winWindow.endFill()

    this.addChild(this.winWindow)
    this.winWindow.addChild(this.message)
  }
}
