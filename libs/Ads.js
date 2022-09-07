import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdMobBannerSize
} from '@capacitor-community/admob'

export async function initialize() {
  const { status } = await AdMob.trackingAuthorizationStatus()

  if (status === 'notDetermined') {
    /**
     * If you want to explain TrackingAuthorization before showing the iOS dialog,
     * you can show the modal here.
     * ex)
     * const modal = await this.modalCtrl.create({
     *   component: RequestTrackingPage,
     * });
     * await modal.present();
     * await modal.onDidDismiss();  // Wait for close modal
     **/
  }

  AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
    initializeForTesting: true
  })
}

export async function banner() {
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    // Subscribe Banner Event Listener
  })

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => {
    // Subscribe Change Banner Size
  })

  const options = {
    adId: 'ca-app-pub-4811149063907388/5887763994',
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0
    // isTesting: true
    // npa: true
  }
  AdMob.showBanner(options)
}
