import { Emitter } from 'pixi-particles'
import { ParticleContainer, Texture, utils } from 'pixi.js'

export default class Particles extends ParticleContainer {
  constructor(texture, cfg, autoStart = true) {
    super()

    this.texture = texture
    this.cfg = cfg

    this.emitter = this.createEmmiter()
    if (autoStart) this.start()
  }

  createEmmiter() {
    return new Emitter(this, Texture.from(utils.BaseTextureCache[this.texture]), this.cfg)
  }

  start() {
    this.emitter.emit = true

    Particles.pool.push(this.emitter)
  }

  stop() {
    this.emitter.emit = false
  }

  static pool = []

  static update(delta) {
    Particles.pool.forEach((emmiter) => emmiter.update(delta / 1000))
  }
}
