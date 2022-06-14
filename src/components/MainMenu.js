import Container from '../../libs/Container'
import Sprite from '../../libs/Sprite'
import Text from '../../libs/Text'
import Tween from '../../libs/Tween'

export default class MainMenu extends Container {
  constructor() {
    super()

    this.playBtn = null
    this.exitBtn = null

    this.createChildren()
    this.subscribe()
    this.animate()
  }

  static Events = {
    play: 'play-btn-clicked',
    exit: 'exit-btn-clicked',
    registration: 'registration-btn-clicked'
  }

  createChildren() {
    const cfg = {
      fontSize: 170,
      fill: '#2E616E'
    }

    this.playBtn = this.addChild(new Sprite('menu/krug2'))
    this.playBtn.scale.set(0.3)
    this.playBtn.position.set(0, -150)

    const playBtnText = this.playBtn.addChild(new Text('Play now!', cfg))
    playBtnText.position.set(0)

    this.registrBtn = this.addChild(new Sprite('menu/krug2'))
    this.registrBtn.scale.set(0.3)
    this.registrBtn.position.set(0, 0)

    const registrBtnText = this.registrBtn.addChild(new Text('Registration', cfg))
    registrBtnText.position.set(0)

    this.exitBtn = this.addChild(new Sprite('menu/krug2'))
    this.exitBtn.scale.set(0.3)
    this.exitBtn.position.set(0, 150)

    const exitBtnText = this.exitBtn.addChild(new Text('Exit', cfg))
    exitBtnText.position.set(0)
  }

  subscribe() {
    this.playBtn.on('pointerdown', this.onPlay, this)
    this.exitBtn.on('pointerdown', this.onExit, this)
    this.registrBtn.on('pointerdown', this.onRegistration, this)
  }

  onPlay() {
    this.emit(MainMenu.Events.play)
  }

  onRegistration() {
    this.emit(MainMenu.Events.registration)
  }

  onExit() {
    this.emit(MainMenu.Events.exit)
  }

  animate() {
    new Tween(this.playBtn.scale)
      .to({ x: this.playBtn.scale.x + 0.05, y: this.playBtn.scale.y + 0.05 }, 600)
      .repeat(Infinity)
      .yoyo(true)
      .start()
  }
}
