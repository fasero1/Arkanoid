import Container from '../../libs/Container'
import { Graphics } from 'pixi.js'

export default class Platform extends Container {
  constructor(scene) {
    super()

    this.platform
    this.x = 0
    this.y = 0
    this.vx = 50
    this.scene = scene.getBounds()

    this.draw()
    this.move()
  }

  draw() {
    this.platform = new Graphics()
    this.addChild(this.platform)
    this.platform.beginFill(0xff0000)
    this.platform.drawRect(-100, 350, 200, 20)
    this.platform.endFill()
  }

  move() {
    window.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 68:
          if (this.x < this.scene.right - 100) this.x += this.vx
          break
        case 65:
          if (this.x > this.scene.left + 100) this.x -= this.vx
          break
      }
    })
  }
}
