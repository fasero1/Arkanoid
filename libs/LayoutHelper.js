export default class LayoutHelper {
  static gameWidth = null
  static gameHeight = null
  static aspectRatio = null

  static onResize({ w, h }) {
    LayoutHelper.width = window.innerWidth
    LayoutHelper.height = window.innerHeight

    LayoutHelper.aspectRatio = Math.max(
      LayoutHelper.width / LayoutHelper.height,
      LayoutHelper.height / LayoutHelper.width
    )

    let gw = null
    let gh = null

    if (LayoutHelper.width > LayoutHelper.height) {
      gh = w
      gw = Math.floor(gh * (LayoutHelper.width / LayoutHelper.height))

      if (gw < h) {
        gw = h
        gh = Math.floor(h * (LayoutHelper.height / LayoutHelper.width))
      }
    }

    if (LayoutHelper.width < LayoutHelper.height) {
      gh = h
      gw = Math.floor(gh * (LayoutHelper.width / LayoutHelper.height))

      if (gw < w) {
        gw = w
        gh = Math.floor(w * (LayoutHelper.height / LayoutHelper.width))
      }
    }

    LayoutHelper.gameWidth = gw
    LayoutHelper.gameHeight = gh
    LayoutHelper.left = -gw / 2
    LayoutHelper.right = gw / 2
    LayoutHelper.top = -gh / 2
    LayoutHelper.bottom = gh / 2
  }
}
