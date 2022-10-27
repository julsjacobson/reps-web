import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { auth, createNewUser } from '../firebase'
import firebase from "firebase/app";


type AuthProviderProps = {children: ReactNode}

type AuthContext = {
    signup: (email: string, password: string, username: string) => void,
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
                currentUser

            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}