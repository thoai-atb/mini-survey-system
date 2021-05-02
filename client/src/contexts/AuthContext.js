import React, { useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserID, setCurrentUserID] = useState() // ID in minisurvey database
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(email, password) {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    /////////////////////////////////////////////////////// DATABASE FETCHES

    async function getUserName () {
        if(!currentUserID)
            return "Not Logged In"
        const res = await fetch(`/api/users/${currentUserID}`)
        const data = await res.json()
        return data[0].username
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    
    useEffect(() => {
        const fetchUserID = async () => {
            let res = await fetch(`/api/users/tokentoid/${currentUser.uid}`)
            /*
                If currentUser changes due to signin up, then the user ID probably won't be available
                because the back-end is creating the new user.
                Therefore we need to create a loop to constantly check if it is present.
            */
            while (res.status !== 200) {
                console.log('Could not get user ID, refetching...')
                await new Promise(r => setTimeout(r, 100))
                res = await fetch(`/api/users/tokentoid/${currentUser.uid}`)
                if (res.status === 200)
                    console.log('User ID found')
            }
            const data = await res.json()
            setCurrentUserID(data.user_id)
        }
        if (currentUser)
            fetchUserID()
        else 
            setCurrentUserID(null)
    }, [currentUser])

    const value = {
        currentUser,
        currentUserID,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        getUserName,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
