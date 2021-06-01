import React from 'react'
import './Comments.css'
import '../../index.css'

export default function Comment({comment}){
    return(
        <div className ='card comment-container' >
            <div className='username'>{comment.username}</div>
            <div className ='comment-content-box'>{comment.content}</div>
        </div>
    )
}

