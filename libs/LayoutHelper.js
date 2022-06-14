export default class LayoutHelper {
  static gameWidth = null
  static gameHeight = null
  static aspectRatio = null
  static isLandscape = null
  static isPortrait = null

  static onResize({ w, h }) {
    LayoutHelper.width = window.innerWidth
    LayoutHelper.height = window.innerHeight

    LayoutHelper.isLandscape = LayoutHelper.width > LayoutHelper.height
    LayoutHelper.isPortrait = LayoutHelper.width < LayoutHelper.height

    LayoutHelper.aspectRatio = Math.max(
      LayoutHelper.width / LayoutHelper.height,
      LayoutHelper.height / LayoutHelper.width
    )

    let gw = null
    let gh = null

    if (LayoutHelper.isLandscape) {
      gh = w
      gw = Math.floor(gh * (LayoutHelper.width / LayoutHelper.height))

      if (gw < h) {
        gw = h
        gh = Math.floor(h * (LayoutHelper.height / LayoutHelper.width))
      }
    }

    if (LayoutHelper.isPortrait) {
      gh = h
      gw = Math.floor(gh * (LayoutHelper.width / LayoutHelper.height))

      if (gw < w) {
        gw = w
        gh = Math.floor(w * (LayoutHelper.height / LayoutHelper.width))
      }
    }

    LayoutHelper.gameWidth = gw
    LayoutHelper.gameHeight = gh
  }
}
