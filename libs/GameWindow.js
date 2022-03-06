import { Container } from 'pixi.js'

export default class GameWindow extends Container {
  constructor() {
    super()
  }

  onResize() {
    console.log('%c gameWindow resize', 'background: #222; color: #bada55')
  }

  onTick(delta) {}
}
