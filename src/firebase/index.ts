// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCEJoDJCuUtl6lNDt1oNnMygfrJVOuW60',
  authDomain: 'fir-db-d9f38.firebaseapp.com',
  databaseURL: 'https://fir-db-d9f38-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fir-db-d9f38',
  storageBucket: 'fir-db-d9f38.appspot.com',
  messagingSenderId: '846572729561',
  appId: '1:846572729561:web:c1cebec5f811da1e19fac8',
  measurementId: 'G-RBG27ZM2W9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const auth = getAuth()

export { auth }
