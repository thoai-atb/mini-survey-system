import React from 'react'
import './Comments.css'
import '../../index.css'
import formatDate from '../../utils/DateFormat'



export default function Comment({comment}){
    return(
        <div className ='card card-wide comment-card' >
            <div className='comment-header'>
                <div className='comment-username'>{comment.username}</div>
                <div className ='comment-date'>{formatDate(new Date(comment.time))}</div>
            </div>
            <div className ='comment-content'>{comment.content}</div>
        </div>
    )
}

