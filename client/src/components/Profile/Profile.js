import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile() {
    const { currentUser, logout } = useAuth()
    
    return (
        <div className="txt-ctr"> 
            <div className="card card-wide">
                <p>This is the profile of {currentUser.email}</p> 
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )

}
