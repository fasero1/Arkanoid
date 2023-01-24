import Container from '../../libs/Container'
import { Graphics } from 'pixi.js'

export default class Ball extends Container {
  constructor() {
    super()

    this.ball
    this.x = 0
    this.y = 60
    this.vx = 0
    this.vy = 10

    this.draw()
    this.move()
  }

  draw() {
    this.ball = new Graphics()
    this.addChild(this.ball)
    this.ball.beginFill(0xff0000)
    this.ball.drawCircle(this.x, this.y, 25)
    this.ball.endFill()
  }

  move() {
    this.x += this.vx
    this.y += this.vy
  }
}
