import { Tween as TWEEN } from '@tweenjs/tween.js'
import { utils } from 'pixi.js'

export default class Tween extends TWEEN {
  constructor(object, group) {
    super(object)

    this.observer = new utils.EventEmitter()
    this.createEmptyCallbacks()
  }

  createEmptyCallbacks() {
    this.onStart(() => {})
    this.onStop(() => {})
    this.onRepeat(() => {})
    this.onComplete(() => {})
  }

  emit(event, a1, a2, a3, a4) {
    this.observer.emit(event, a1, a2, a3, a4)

    return this
  }

  on(event, func, context) {
    this.observer.on(event, func, context)
    return this
  }

  once(event, func, context) {
    this.observer.once(event, func, context)
    return this
  }

  off(event, func, context) {
    this.observer.off(event, func, context)
    return this
  }

  onStart(callback) {
    const newCallback = () => {
      const result = callback()

      this.emit('start')

      return result
    }

    return super.onStart(newCallback)
  }

  // onEveryStart(callback) {
  //   const newCallback = () => {
  //     const result = callback()

  //     this.emit('every-start')

  //     return result
  //   }

  //   return super.onEveryStart(newCallback)
  // }

  onStop(callback) {
    const newCallback = () => {
      const result = callback()

      this.emit('stop')

      return result
    }

    return super.onStop(newCallback)
  }

  onRepeat(callback) {
    const newCallback = () => {
      const result = callback()

      this.emit('repeat')

      return result
    }
    return super.onRepeat(newCallback)
  }

  onComplete(callback) {
    const newCallback = () => {
      const result = callback()

      this.emit('complete')

      return result
    }

    return super.onComplete(newCallback)
  }

  static update(delta) {
    console.log('ad')
    Tween._gameTime = delta >= 0 ? Tween._gameTime + delta : TWEEN.now()
    Tween.scope.update(Tween._gameTime)
  }
}
