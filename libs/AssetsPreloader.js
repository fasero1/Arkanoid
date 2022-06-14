import { Loader } from 'pixi.js'

export default class AssetsPreloader {
  constructor(assets) {
    this.loader = Loader.shared

    this.assets = assets

    this.totalItems = Object.values(this.assets).flat().length
    this.loadedItems = 0

    this.images = []
    this.fonts = []

    this.onComplete = null
  }

  preload() {
    if (this.assets.images) this.loadImages()
    if (this.assets.fonts) this.loadFonts()

    this.loader.load(() => this.onCompletePreload())
  }

  loadImages() {
    this.assets.images.forEach((img) => {
      this.loader.add(img.id, img.src, (res) => {
        this.images.push(res.texture)
        this.loadedItems++
      })
    })
  }

  loadFonts() {
    const head = document.getElementsByTagName('head')[0]

    this.assets.fonts.forEach((font) => {
      this.loader.add(font.id, font.src, (res) => {
        this.loadedItems++

        const s = document.createElement('style')
        s.type = 'text/css'
        s.appendChild(
          document.createTextNode('@font-face {font-family: ' + font.id + '; src: url(' + font.src + ');' + '}')
        )

        head.appendChild(s)
      })
    })
  }

  onCompletePreload() {
    this.onComplete()
  }
}
