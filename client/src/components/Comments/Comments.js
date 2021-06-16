import React, { useState, useEffect, useRef } from 'react'
import Comment from './Comment'
import './Comments.css'
import { useAuth } from '../../contexts/AuthContext'


export default function Comments({survey}) {
    const[comments, setComments] = useState([])
    const [reloadComment, setReloadComment] = useState(true) 
    const {currentUserID} = useAuth()
    const commentRef = useRef(null)
    
    const submitComment = async () => {
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
        if(commentRef.current.value !== ""){
            await submitComment()
            commentRef.current.value = ""
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            const res = await fetch(`/api/comments/${survey.survey_id}`)
            const data = await res.json()
            setComments(data)
        }
        if(survey && reloadComment) {
            fetchComments()
            setReloadComment(false)
        }
    }, [survey, reloadComment])
    return(
        <div className=''>
            <h3>{comments.length} comments</h3>
            <div className = 'comment-area'>  
            {
                comments.map((comment, id) => {
                    return <Comment key={id} comment={comment}/>
                })
            }
            </div>
            <h3>Your Comment here!</h3>
            {
            currentUserID === null ? 
                <h3>Login to comment</h3> 
                :
                <div className = "comment-input-area" >
                    <input type ="textarea" rows = "10" cols="60" ref={commentRef} className="comment-box" placeholder="Write a comment..."/>
                    <input type ="button" className="add-comment-btn" value="Add" onClick={submitComment}/>
                </div>
            }
        </div>
    )
}
