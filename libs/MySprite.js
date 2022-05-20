import { Container, Sprite, Texture, utils } from 'pixi.js'

export default class MySprite extends Container {
  constructor(url) {
    super()

    this.sprite = this.addChild(new Sprite(Texture.from(utils.BaseTextureCache[url])))

    this.sprite.anchor.set(0.5)
  }
}
