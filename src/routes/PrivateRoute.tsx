import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ReactNode } from "react"

type PrivateRouteProps = { children: ReactNode }

export function PrivateRoute({children} : PrivateRouteProps) {
    const {currentUser} = useAuth() 
    return currentUser ? <>{children}</>: <Navigate to="/sign-in" />
}