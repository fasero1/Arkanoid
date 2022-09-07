import { Application, TextStyle, utils } from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'

import './main.css'

import AssetsPreloader from '../libs/AssetsPreloader'
import LayoutHelper from '../libs/LayoutHelper'
import Particles from '../libs/Particles'
import Text from '../libs/Text'

import MainWindow from './view/MainWindow'

export default class Game {
  static app = null
  static currentWindow = null
  static observer = null
  static container = document.body
  static size = { w: 960, h: 960 }
  static liveTime = 0
  static registrationForm = null
  static playerId = null
  static loader = null
  static fpsCounter = null

  static fps = 0
  static fpsTimer = 0

  static init() {
    Game.container = document.body

    const pixiConfig = {
      width: Game.size.w,
      height: Game.size.h,
      antialias: true, // default: false
      backgroundAlpha: true, // default: false
      resolution: 1, // default: 1
      backgroundColor: 0x2c3e50
    }

    Game.app = new Application(pixiConfig)
    Game.container.appendChild(Game.app.view)

    Game.app.view.style.position = 'absolute'
    Game.app.view.style.left = '0'
    Game.app.view.style.top = '0'

    Game.observer = new utils.EventEmitter()

    Game.loader = new AssetsPreloader(Game.getAssets())
    Game.loader.onComplete = Game.createMainWindow
    Game.loader.preload()
    Game.createFrameCounter()
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

  static createFrameCounter() {
    const counter = Game.app.stage.addChild(new Text('0', { fontSize: 65 }))

    counter.position.set(100)

    Game.fpsCounter = counter
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
    LayoutHelper.onResize(Game.size)

    const { width, height, gameWidth, gameHeight } = LayoutHelper

    document.body.style.width = width + 'px'
    document.body.style.height = height + 'px'

    Game.app.renderer.resize(gameWidth, gameHeight)
    Game.app.view.style.width = width + 'px'
    Game.app.view.style.height = height + 'px'

    Game.currentWindow.position.set(Game.app.renderer.width / 2, Game.app.renderer.height / 2)
    Game.currentWindow.onResize()

    Game.emit('resize')
  }

  static onTick() {
    const lastTime = Game.app.ticker.lastTime
    const delta = Game.app.ticker.elapsedMS

    Game.liveTime += delta

    TWEEN.update(lastTime)
    Particles.update(delta)

    Game.fpsTimer += delta
    Game.fps += 1
    if (Game.fpsTimer >= 1000) {
      Game.fpsCounter.setText(Game.fps)
      Game.fpsTimer = 0
      Game.fps = 0
    }

    Game.currentWindow.onTick(delta)
  }

  static exit() {
    console.warn('EXIT')

    window.close()
  }
}
