import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBmNqNqXsPrauKDDd-84Erf_7mkQnq6WMM",
    authDomain: "mini-survey-system.firebaseapp.com",
    projectId: "mini-survey-system",
    storageBucket: "mini-survey-system.appspot.com",
    messagingSenderId: "277184793370",
    appId: "1:277184793370:web:f882353d6731487e013aa3"
})

export const auth = app.auth()
export default app