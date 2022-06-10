import { Container, Sprite as PixiSprite, Texture, utils } from 'pixi.js'

export default class Sprite extends PixiSprite {
  constructor(url) {
    super(Texture.from(utils.BaseTextureCache[url]))

    this.anchor.set(0.5)
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
