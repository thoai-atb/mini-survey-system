import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import './Comments.css'
import { useAuth } from '../../contexts/AuthContext'


export default function Comments({survey}) {
    const[comments,setComments] = useState(null);
    const {currentUserID} = useAuth()
    
    const submitComments = async () => {
        const submitComment = async () => {
            await fetch(`/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userID: currentUserID,
                    surveyID: survey.survey_id,
                    content: comments.content
                })
            })
        }
        if(currentUserID)
            await submitComment()
    }

    useEffect(() => {
        const fetchComments = async () => {
            const url = new URL('/api/comments/', window.location)
            url.searchParams.append('surveyID', survey.survey_id)
            const res = await fetch(url)
            const data = await res.json()
            setComments(data)
        }
        fetchComments()
    })

    return(
        <div class='comments-container'>
            <h3>Comments</h3>
            <div className = "comment-input-container" onClick = {currentUserID? submitComments : null}>
                <input type ="text area" className="comment-box " placeholder="Write a comment..."/>
                <input type = "button" className="add-comment-btn " value="Add"/>
            </div>
            {comments.map((comment) => {
                return <Comment comment ={comment}/>
            })
            }
        </div>
    )
}
