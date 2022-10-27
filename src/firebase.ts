import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';


const app = firebase.initializeApp({
    apiKey:process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_DOMAIN, 
    projectId: process.env.FIREBASE_PROJECT_ID, 
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, 
    appId: process.env.FIREBASE_APP_ID, 
    measurementId: process.env.FIREBASE_APP_MEASUREMENT_ID
})

export const auth = app.auth()
export function createNewUser(email:string, password: string, username: string) {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
        console.log("Sign up success")
        firebase.firestore().collection("users")
        .doc(user?.user?.uid)
        .set({
            email: user?.user?.email,
            uid: user?.user?.uid,
            username: username
        })
    }).catch(e => {
        console.log("ERROR", e.message)
    })
}

export async function usernameExists (username: string) {
    return firebase.firestore().collection("users")
    .where('username', '==', username).get().then((res) => {
        if (res.size > 0) return true 
        return false
    })
}

export async function emailExists (email: string) {
    return firebase.firestore().collection("users")
    .where('email', '==', email).get().then((res) => {
        if (res.size > 0) return true 
        return false
    })
}

export default app
