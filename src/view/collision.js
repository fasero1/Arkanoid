import { EventEmitter } from 'eventemitter3'

export default class Collision {
  constructor(ball, platform, enemy, scene) {
    this.ball = ball
    this.platform = platform
    this.enemy = enemy

    this.speedX = 2
    this.speedY = 5
    this.scene = scene.getBounds()
    this.emitter = new EventEmitter()

    this.checkCollision()
  }

  checkCollision() {
    if (this.enemy.enemys == false) {
      this.emitter.emit('win')
      this.ball.vy = 0
      this.ball.vx = 0
    }

    if (this.ball.y + 85 > this.scene.bottom) {
      this.emitter.emit('gameover')
      this.ball.vy = 0
      this.ball.vx = 0
    }

    if (this.ball.y + 20 < this.scene.top) {
      this.ball.vy = +5
    }

    if (this.ball.x + 20 > this.scene.right) {
      this.ball.vx = -this.speedX
    }

    if (this.ball.x - 20 < this.scene.left) {
      this.ball.vx = this.speedX
    }

    if (
      this.ball.getBounds().bottom > this.platform.getBounds().top &&
      this.ball.getBounds().left + 20 > this.platform.getBounds().left - 20 &&
      this.ball.getBounds().right - 20 < this.platform.getBounds().right + 20
    ) {
      if (this.ball.x > this.platform.x) {
        this.ball.vx = this.speedX
      } else this.ball.vx = -this.speedX
      this.ball.vy = -this.speedY
    }

    for (let i = 0; i < this.enemy.enemys.length; i++) {
      let ballBounds = this.ball.getBounds()
      let enemyChildBounds = this.enemy.enemys[i].rect.getBounds()

      if (
        ballBounds.top < enemyChildBounds.bottom &&
        ballBounds.bottom > enemyChildBounds.top &&
        ballBounds.left < enemyChildBounds.right &&
        ballBounds.right > enemyChildBounds.left
      ) {
        if (ballBounds.top < enemyChildBounds.top) {
          this.ball.vy = -this.speedY
        } else {
          this.ball.vy = this.speedY
        }
        this.enemy.hitted(i)
      }
    }
  }
}
