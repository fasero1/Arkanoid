import { Graphics } from 'pixi.js'
import Container from '../../libs/Container'

export default class Scene extends Container {
  constructor() {
    super()

    this.scene

    this.draw()
  }

  draw() {
    this.scene = new Graphics()
    this.addChild(this.scene)
    this.scene.beginFill(0x000000)
    this.scene.drawRect(-600, -400, 1200, 800)
    this.scene.endFill()
  }
}
