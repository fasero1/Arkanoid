import { Container as PixiContainer } from 'pixi.js'

export default class Container extends PixiContainer {
  constructor() {
    super()
  }

  on(event, fn, context) {
    this.interactive = true
    super.on(event, fn, context)
  }

  once(event, fn, context) {
    this.interactive = true
    super.once(event, fn, context)
  }
}
