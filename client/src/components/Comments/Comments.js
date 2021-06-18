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
        <div className='comment-div '>
            <h2>Comment Section</h2>
            {
                currentUserID === null ? 
                <p><i>(login to comment)</i></p> 
                :
                <div className = "card card-wide comment-input-area" >
                    <h3>✍ Add a comment</h3>
                    <textarea ref={commentRef} rows={3} className="comment-box" placeholder="Write a comment..."/>
                    <button className="comment-add-btn" onClick={submitComment}>Add</button>
                </div>
            }
            <h3>Comments ({comments.length})</h3>
            <div className = 'comment-area'>  
            {
                comments.map((comment, id) => {
                    return <Comment key={id} comment={comment} setReloadComment={setReloadComment}/>
                })
            }
            </div>
        </div>
    )
}
