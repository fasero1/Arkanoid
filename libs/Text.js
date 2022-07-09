import { Text as PixiText } from 'pixi.js'

export default class Text extends PixiText {
  constructor(str, cfg, canvas) {
    super(str, cfg, canvas)

    this.anchor.set(0.5)
  }

  setText(str) {
    this.text = str
  }
}
