import React from 'react'
import './Comments.css'
import '../../index.css'
import formatDate from '../../utils/DateFormat'



export default function Comment({comment}){
    return(
        <div className ='card' >
            <div className='comment-username'>{comment.username}</div>
            <p className ='comment-content'>{comment.content}</p>
            <div className ='comment-date'>on {formatDate(new Date(comment.time))}</div>
        </div>
    )
}

