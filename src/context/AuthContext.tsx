import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { auth, createNewUser, loginUser } from '../firebase'
import firebase from "firebase/app";


type AuthProviderProps = {children: ReactNode}

type AuthContext = {
    signup: (email: string, password: string, username: string) => void,
    signin: (username: string, password: string) => Promise<string>,
    resetPassword: (email: string) => Promise<any>,
    currentUser: firebase.User | null,
}


const AuthContext = createContext({} as AuthContext) 


export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({children} : AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
    const [loading, setLoading] = useState<Boolean>(true)

    function signup(email:string, password:string, username: string) {
        createNewUser(email, password, username)
    }


    async function signin(username: string, password: string)  {
        return await loginUser(username, password)

    } 

    async function resetPassword(email :string) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe

    }, [])

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                resetPassword,
                currentUser

            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}