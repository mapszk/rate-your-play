import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

export const AuthContext = React.createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setUser(user)
            setLoading(false)
        })
        return () => {
            setLoading(false)
            unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={{user}}>
            {
                loading ? 'Loading...' : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
