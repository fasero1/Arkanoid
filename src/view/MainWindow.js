import { Graphics } from 'pixi.js'
import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import Sprite from '../../libs/Sprite'
import Tween from '../../libs/Tween'

import MainMenu from '../components/MainMenu'

import Scene from './Scene'

import Game from '../Game'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.background = null
    this.level = null

    this.createChildren()
    this.subscribe()
  }

  createChildren() {
    this.background = this.addChild(new Sprite('back'))

    this.menu = this.addChild(new MainMenu())

    this.level = this.addChild(new Scene())
    this.level.visible = false

    this.shadow = this.addChild(new Graphics().beginFill(0x000000).drawRect(-1, -1, 2, 2).endFill())
    this.shadow.alpha = 0
  }

  subscribe() {
    this.menu.on(MainMenu.Events.play, this.startNewLevel, this)
    this.menu.on(MainMenu.Events.exit, this.onExit, this)
    this.menu.on(MainMenu.Events.registration, this.onRegistration, this)

    Game.on('registration-window-closed', this.onCloseRegistration, this)
  }

  startNewLevel() {
    const showScene = new Tween(this.shadow).to({ alpha: 0 }, 300).delay(300)

    const hideScene = new Tween(this.shadow)
      .to({ alpha: 1 }, 300)
      .onComplete(() => {
        this.menu.visible = false
        this.level.visible = true
      })
      .chain(showScene)
      .start()
  }

  onRegistration() {
    const shadowBack = new Tween(this.shadow)
      .to({ alpha: 0.7 }, 250)
      .onComplete(() => {
        Game.getRegistationForm()
      })
      .start()
  }

  onCloseRegistration() {
    console.log('asdas')

    const shadowBack = new Tween(this.shadow).to({ alpha: 0 }, 250).start()
  }

  onExit() {
    new Tween(this.shadow)
      .to({ alpha: 1 }, 1000)
      .onComplete(() => {
        Game.exit()
      })
      .start()
  }

  onResize() {
    const { gameWidth, gameHeight, isLandscape, aspectRatio } = LayoutHelper

    // console.log(aspectRatio)

    if (isLandscape) {
      aspectRatio < 1.6 ? (this.background.width = gameWidth * 1.4) : (this.background.width = gameWidth)

      this.background.scale.y = this.background.scale.x
    } else {
      this.background.height = gameHeight
      this.background.scale.x = this.background.scale.y
    }

    this.shadow.width = gameWidth
    this.shadow.height = gameHeight
  }
}
