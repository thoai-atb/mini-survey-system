import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ProfileSurvey from './ProfileSurvey'
import './Profile.css'

export default function Profile() {
    const { currentUser, logout, currentUserID, getUserName } = useAuth()
    const [username, setUsername] = useState()
    const [surveys, setSurveys] = useState([])

    useEffect(() => {
        const fetchSurveys = async () => {
            const res = await fetch(`/api/users/${currentUserID}/surveys`)
            if (res.status !== 200) {
                console.log(res);
                return
            }
            const data = await res.json()
            console.log(data)
            setSurveys(data)
        }
        if(currentUserID)
            fetchSurveys()
    }, [currentUserID])

    useEffect(() => {
        const fetchUsername = async () => {
            setUsername(await getUserName())
        }
        fetchUsername()
    }, [getUserName])
    
    return (
        <div className="txt-ctr"> 
            <div className="card card-wide">
                <h1>Profile</h1>
                <p>🖐 Hi, {username}, Welcome to your profile!</p>
                <p><strong>Email:</strong> {currentUser.email}</p> 
                <button onClick={logout}>Log Out</button>
            </div>
            <p className='profile-surveys-header'>Your Surveys ({surveys.length})</p>
            <div className="profile-surveys">
                {
                    surveys && surveys.map((survey, index) => {
                        return (
                            <ProfileSurvey key={index} authorName={username} survey={survey} />
                        )
                    })
                }
            </div>
        </div>
    )

}
