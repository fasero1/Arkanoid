import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import Platform from './Platform'
import Enemy from './Enemy'
import Ball from './Ball'
import Scene from './Scene'
import GameOver from './GameOver'
import WinWindow from './WinWindow'
import Collision from './collision'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.scene = new Scene()
    this.gameOver = new GameOver()
    this.winWindow = new WinWindow()
    this.platform = new Platform(this.scene)
    this.enemy = new Enemy(10)
    this.ball = new Ball()
    this.collision = new Collision(this.ball, this.platform, this.enemy, this.scene)
    this.collision.emitter.on('gameover', (event) => this.subscribe('gameover'))
    this.collision.emitter.on('win', (event) => this.subscribe('win'))

    this.createChildren()
  }

  createChildren() {
    this.addChild(this.scene)
    this.scene.addChild(this.platform)
    this.scene.addChild(this.enemy)
    this.scene.addChild(this.ball)
  }

  subscribe(event) {
    if (event === 'gameover') {
      this.removeChild(this.scene)
      this.addChild(this.gameOver)
    } else if (event === 'win') {
      this.removeChild(this.scene)
      this.addChild(this.winWindow)
    }
  }

  onResize() {
    const { gameWidth, gameHeight, aspectRatio } = LayoutHelper
  }

  onTick() {
    this.collision.checkCollision()
    this.ball.move()
  }
}
