import GameWindow from '../../libs/GameWindow'
import LayoutHelper from '../../libs/LayoutHelper'
import Text from '../../libs/Text'
import Sprite from '../../libs/Sprite'
import FieldView from '../components/engine/FieldView'

import { AdMob } from '@capacitor-community/admob'
import { banner } from '../../libs/Ads'

export default class MainWindow extends GameWindow {
  constructor() {
    super()

    this.createChildren()
    this.subscribe()
  }

  createChildren() {
    const field = this.addChild(new FieldView())

    // const sprite = this.addChild(new Sprite('paper'))
    // sprite.on('pointerdown', async () => {
    //   const status = await AdMob.trackingAuthorizationStatus()
    //   banner()
    //   console.log(status)
    // })
  }

  subscribe() {}

  onResize() {
    const { gameWidth, gameHeight, aspectRatio } = LayoutHelper
  }
}
