import { Application, utils } from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'

import './main.css'

import AssetsPreloader from '../libs/AssetsPreloader'
import LayoutHelper from '../libs/LayoutHelper'
import Particles from '../libs/Particles'

import MainWindow from './view/MainWindow'
import GameWindow from '../libs/GameWindow'
import Firebase from '../libs/Firebase'

export default class Game {
  static app = null
  static currentWindow = null
  static observer = null
  static container = document.body
  static size = { w: 960, h: 960 }
  static liveTime = 0
  static registrationForm = null
  static playerId = null

  static init() {
    Game.container = document.body

    const pixiConfig = {
      width: Game.size.w,
      height: Game.size.h,
      antialias: true, // default: false
      // transparent: false, // default: false
      resolution: 1, // default: 1
      backgroundColor: 0x2c3e50
    }

    Game.app = new Application(pixiConfig)
    Game.container.appendChild(Game.app.view)

    // Game.app.view.style.position = 'absolute'
    // Game.app.view.style.left = '0'
    // Game.app.view.style.top = '0'

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

    let delta = Game.app.ticker.elapsedMS

    Game.liveTime += delta

    TWEEN.update(lastTime)
    Particles.update(delta)

    Game.currentWindow.onTick(delta)
  }

  static exit() {
    console.log('EXIT')

    window.close()
  }

  static getRegistationForm() {
    const form = document.querySelector('form')
    form.style.display = 'block'

    const regFunc = (e) => {
      e.preventDefault()

      const inputs = document.querySelectorAll('input')
      if (inputs[0].value.includes('@') && inputs[1].value === inputs[2].value) {
        registrationBtn.removeEventListener('click', regFunc)

        Firebase.registration(inputs[0].value, inputs[1].value)
      }

      // Game.emit('registration-window-closed')
      // form.style.display = 'none'
    }

    const closeBtn = document.querySelector('.cancelbtn')
    closeBtn.addEventListener('click', () => {
      form.style.display = 'none'
      registrationBtn.removeEventListener('click', regFunc)

      Game.emit('registration-window-closed')
    })

    const registrationBtn = document.querySelector('.signupbtn')
    registrationBtn.addEventListener('click', regFunc)
  }
}
