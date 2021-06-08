import React from 'react'
import './Comments.css'
import '../../index.css'
import { useAuth } from '../../contexts/AuthContext'


export default function Comment({comment}){
    const {currentUserID} = useAuth()

    return(
        <div className ='card comment-container' >
            <div className='username'>{comment.username}</div>
            <div className ='comment-content-box'>{comment.content}</div>
            {currenUserID === comment.user_id ? <input type = "button" className="edit-comment-btn " value="Edit"/> : null}
            {currenUserID === comment.user_id ? <input type = "button" className="delete-comment-btn " value="Delete"/> :null}
        </div>
    )
}

