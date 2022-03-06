import { Application, utils } from 'pixi.js'
import './main.css'

import MainWindow from './view/MainWindow'

export default class Game {
  static init() {
    const pixiConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      resizeTo: window
    }

    Game.app = new Application(pixiConfig)
    document.body.appendChild(Game.app.view)

    Game.observer = new utils.EventEmitter()

    Game.currentWindow = Game.app.stage.addChild(new MainWindow())

    Game.subscribe()
    Game.onResize()
  }

  static subscribe() {
    window.addEventListener('resize', Game.onResize)

    Game.app.ticker.add(Game.onTick)
  }

  static emit(event, a1, a2, a3, a4) {
    Game.observer.emit(event, a1, a2, a3, a4)
    // Game.observer.emit('gameEvent', { type: event, data: a1 })
  }

  static on(event, func, context) {
    Game.observer.on(event, func, context)
  }

  static once(event, func, context) {
    Game.observer.once(event, func, context)
  }

  static off(event, func, context) {
    Game.observer.off(event, func, context)
  }

  static onResize() {
    Game.app.stage.pivot.set(-window.innerWidth / 2, -window.innerHeight / 2)

    Game.currentWindow.onResize()

    Game.emit('resize')
  }

  static onTick(delta) {
    Game.currentWindow.onTick(delta)
  }
}
