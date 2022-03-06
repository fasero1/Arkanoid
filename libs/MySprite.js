import { Sprite, Texture } from 'pixi.js'

export default class MySprite extends Sprite {
  constructor(url) {
    super(Texture.from(url))

    this.anchor.set(0.5)
  }
}
