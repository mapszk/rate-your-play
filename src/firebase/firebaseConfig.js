import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const auth = firebase.auth()
export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const writeUserOnDatabase = async (user) => {
  await db.collection('users')
    .add({
      photoURL: user.photoURL || null,
      displayName: user.displayName,
      uid: user.uid
    })
    .catch(err=>{
      return err.message
    })
}
export const updateUserOnDatabase = async (data, user) => {
  
}
export const getUserDataFromDatabase = async (userUID) => {
  await db.collection('users')
    .where('uid', '==', userUID)
    .get()
    .then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        return doc.data()
      })
    })
    .catch(err=>{
      return err.message
    })
}
