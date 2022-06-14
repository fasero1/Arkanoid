import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default class Firebase {
  static config = {
    apiKey: 'AIzaSyAqd309kZrESnFzzrkjMeew_Go07wAdzkc',
    authDomain: 'match-3-fd3bc.firebaseapp.com',
    projectId: 'match-3-fd3bc',
    storageBucket: 'match-3-fd3bc.appspot.com',
    messagingSenderId: '1058124920399',
    appId: '1:1058124920399:web:43e1faee0d309c1d06dc3a',
    measurementId: 'G-T3GNKBGT82'
  }

  static app = initializeApp(Firebase.config)

  static db = getFirestore(Firebase.app)

  static request = async () => {
    const docRef = doc(Firebase.db, 'users', 'sprutik')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  static registration(email, password) {
    console.log(email, password)

    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error.message)
      })
  }
}
