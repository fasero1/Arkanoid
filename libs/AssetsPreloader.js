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
    console.log('load')
    this.assets.images.forEach((url) => {
      const name = url.split('/').at(-1).split('.')[0]

      this.loader.add(name, url, (res) => {
        this.images.push(res.texture)
        this.loadedItems++
      })
    })
  }

  onCompletePreload() {
    this.onComplete()
  }
}
