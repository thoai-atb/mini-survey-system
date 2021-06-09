import React, { useState, useEffect, useRef } from 'react'
import Comment from './Comment'
import './Comments.css'
import { useAuth } from '../../contexts/AuthContext'


export default function Comments({survey}) {
    const[comments, setComments] = useState([])
    const [reloadComment, setReloadComment] = useState(true) 
    const {currentUserID} = useAuth()
    const commentRef = useRef(null)
    
    const submitComments = async () => {
        const submitComment = async () => {
            await fetch(`/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: currentUserID,
                    survey_id: survey.survey_id,
                    content: commentRef.current.value
                })
            })
            setReloadComment(true)
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
        if(survey && reloadComment) {
            fetchComments()
            setReloadComment(false)
        }
    }, [survey, reloadComment])

    return(
        <div className='comments-container'>
            <h3>Comments</h3>
            <div className = "comment-input-container" >
                <input type ="textarea" ref={commentRef} className="comment-box" placeholder="Write a comment..."/>
                <input type ="button" className="add-comment-btn" value="Add" onClick={submitComments}/>
            </div>
            {
                comments.map((comment, id) => {
                    return <Comment key={id} comment={comment}/>
                })
            }
        </div>
    )
}
