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

export async function loginUser(username: string, password: string) {
    // Get email

    return await firebase.firestore().collection("users").where("username", '==', username)
        .limit(1)
        .get().then(async (querySnapshot) => {
            let email = querySnapshot.docs.map((doc) => {
                return doc.data().email
            })

            // Sign in 
            if (email.length > 0) {
                return await auth.signInWithEmailAndPassword(email[0], password).then(() => {
                        return 'Success'
                    }).catch((e) => {
                        throw new Error("Incorrect password")
                    })
  
            } else {
                throw new Error("Username not found")
            }
        

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
