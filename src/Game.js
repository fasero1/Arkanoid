import { Application, utils } from 'pixi.js'
import './main.css'

import AssetsPreloader from '../libs/AssetsPreloader'
import LayoutHelper from '../libs/LayoutHelper'
import MainWindow from './view/MainWindow'

export default class Game {
  static app = null
  static currentWindow = null
  static observer = null

  static init() {
    const pixiConfig = {
      antialias: true
    }

    Game.app = new Application(pixiConfig)
    document.body.appendChild(Game.app.view)

    Game.observer = new utils.EventEmitter()

    Game.loader = new AssetsPreloader(Game.getAssets())
    Game.loader.onComplete = Game.createMainWindow
    Game.loader.preload()
  }

  static getAssets() {
    const assets = { images: [], fonts: [], sounds: [] }
    const res = require.context('./assets/', true, /^\.\/.*$/)

    res.keys().forEach((key) => {
      const path = key.split('/')
      path.shift()

      if (path[0] in assets) {
        const folder = path.shift()
        const id = path.join('/').split('.').shift()

        const obj = {
          id: id,
          src: res(key).default
        }

        assets[folder].push(obj)
      }
    })

    return assets
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
    LayoutHelper.onResize()

    Game.app.stage.pivot.set(-LayoutHelper.gameWidth / 2, -LayoutHelper.gameHeight / 2)

    Game.app.renderer.resize(LayoutHelper.gameWidth, LayoutHelper.gameHeight)

    Game.currentWindow.onResize()

    Game.emit('resize')
  }

  static onTick(delta) {
    Game.currentWindow.onTick(delta)
  }
}
