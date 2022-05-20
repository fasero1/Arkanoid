import { Application, utils } from 'pixi.js'
import './main.css'

import MainWindow from './view/MainWindow'
import AssetsPreloader from '../libs/AssetsPreloader'

import assetsData from './assets.json'

export default class Game {
  static app = null
  static currentWindow = null
  static loader = null
  static observer = null
  static width = window.innerWidth
  static height = window.innerHeight

  static init() {
    const pixiConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true
      // resizeTo: window
    }

    Game.app = new Application(pixiConfig)
    document.body.appendChild(Game.app.view)

    Game.observer = new utils.EventEmitter()

    Game.loader = new AssetsPreloader(assetsData)
    Game.loader.onComplete = Game.createMainWindow
    Game.loader.preload()
  }

  static createMainWindow() {
    Game.currentWindow = Game.app.stage.addChild(new MainWindow())

    Game.subscribe()
    Game.onResize()
  }

  static subscribe() {
    window.onresize = Game.onResize

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
    Game.width = window.innerWidth
    Game.height = window.innerHeight
    Game.app.renderer.resize(Game.width, Game.height)

    Game.currentWindow.onResize()

    Game.emit('resize')
  }

  static onTick(delta) {
    Game.currentWindow.onTick(delta)
  }
}
