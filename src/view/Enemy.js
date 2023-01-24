import { Graphics } from 'pixi.js'
import Container from '../../libs/Container'

export default class Enemy extends Container {
  constructor(amount) {
    super()

    this.enemys = new Array(amount)
    // Calculate the center position of the main window
    this.x = -270
    this.y = -150

    this.draw(amount)
  }

  draw(amount) {
    for (let i = 0; i < amount; i++) {
      let enemy = new Graphics()
      this.enemys[i] = {
        id: i,
        rect: enemy
      }
      this.addChild(this.enemys[i].rect)
      this.enemys[i].rect.beginFill(0xff0000)
      this.enemys[i].rect.drawRect(this.x + i * 110, this.y, 100, 30)
      this.enemys[i].rect.endFill()
    }
  }

  hitted(id) {
    if (this.enemys[id]) {
      this.removeChild(this.enemys[id].rect)
      this.enemys.splice(id, 1)
    }
  }
}
