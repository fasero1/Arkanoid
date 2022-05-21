export default class LayoutHelper {
  static gameWidth = null
  static gameHeight = null
  static aspectRatio = null
  static isLandscape = null
  static isPortrait = null

  static onResize() {
    LayoutHelper.gameWidth = window.innerWidth
    LayoutHelper.gameHeight = window.innerHeight

    LayoutHelper.aspectRatio = Math.max(
      LayoutHelper.gameWidth / LayoutHelper.gameHeight,
      LayoutHelper.gameHeight / LayoutHelper.gameWidth
    )

    LayoutHelper.isLandscape = LayoutHelper.gameWidth > LayoutHelper.gameHeight
    LayoutHelper.isPortrait = LayoutHelper.gameWidth < LayoutHelper.gameHeight
  }
}
