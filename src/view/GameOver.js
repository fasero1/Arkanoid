import { Graphics, TextStyle, Text } from 'pixi.js'
import Container from '../../libs/Container'

export default class GameOver extends Container {
  constructor() {
    super()

    this.gameOver
    const style = new TextStyle({
      fontFamily: 'Futura',
      fontSize: 64,
      fill: 'white'
    })
    this.message = new Text('You Lose', style)
    this.message.x = -120
    this.message.y = -100

    this.draw()
  }

  draw() {
    this.gameOver = new Graphics()
    this.gameOver.beginFill(0x000000)
    this.gameOver.drawRect(-600, -400, 1200, 800)
    this.gameOver.endFill()

    this.addChild(this.gameOver)
    this.gameOver.addChild(this.message)
  }
}
