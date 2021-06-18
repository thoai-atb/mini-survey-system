import React from 'react'
import './Comments.css'
import '../../index.css'
import formatDate from '../../utils/DateFormat'



export default function Comment({comment, setReloadComment}){
    
    const editComment = async () => {
        let editedComment = window.prompt("Edit Your Comment: ")
        if(!editedComment)
            return
        await fetch('/api/comments/' + comment.comment_id, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({content: editedComment})
        })
        setReloadComment(true)
    }

    const deleteComment = async () => {
        if(!window.confirm("Are you sure you want to delete this comment?"))
            return;
        await fetch('/api/comments/' + comment.comment_id, {method: 'DELETE'})
        setReloadComment(true)
    }

    return(
        <div className ='card card-wide comment-card' >
            <div className='comment-header'>
                <div className='comment-username'>{comment.username}</div>
                <div className ='comment-date'>{formatDate(new Date(comment.time))}</div>
            </div>
            <div className ='comment-content'>{comment.content}</div>
            <div className='comment-footer'>
                <span className="comment-modify-button" onClick={() => editComment()}>Edit</span>
                <span className="comment-modify-button" onClick={() => deleteComment()}>Delete</span>
            </div>
        </div>
    )
}

