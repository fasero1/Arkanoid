import { Loader } from 'pixi.js'

export default class AssetsPreloader {
  constructor(assets) {
    this.loader = Loader.shared

    this.assets = assets

    this.totalItems = Object.values(this.assets).flat().length
    this.loadedItems = 0

    this.images = []

    this.onComplete = null
  }

  preload() {
    if (this.assets.images) this.loadImages()

    this.loader.load(() => this.onCompletePreload())
  }

  loadImages() {
    this.assets.images.forEach((obj) => {
      this.loader.add(obj.id, obj.src, (res) => {
        this.images.push(res.texture)
        this.loadedItems++
      })
    })
  }

  onCompletePreload() {
    this.onComplete()
  }
}
