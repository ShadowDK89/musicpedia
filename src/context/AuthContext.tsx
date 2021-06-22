import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

const defaultValue:any = '';

const AuthContext = React.createContext(defaultValue);

type AuthContextProps = {
    children: any;
}

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider:React.FC<AuthContextProps> = ({ children }) => {
    const defaultUser:any = '';
    const [currentUser, setCurrentUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);

    function signup(email:string, password:string){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email:string, password:string){        
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email:string) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email:string) {
        if(currentUser !== undefined){
            return currentUser.updateEmail(email);
        }
    }

    function updatePassword(password:string) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };