import React, { useState } from 'react'
import Comment from './Comment'
import './Comments.css'


export default function Comments() {
    const[comments,setComments] = useState([
        {
            id: 1,
            username: 'Allah',
            content: 'allah the god '
        },
        {
            id: 2,
            username: 'Muhammad',
            content: 'muhammad the prophet '
        },
        {
            id: 3,
            username: 'Mustafa',
            content: 'mustafa the great '
        }
    ])

    const submitComment= (comment) => {
        comments.push({
            id: 'unkwown',
            username: 'nwowknu',
            content: comment.target.value,
        }) 
        console.log(comments)
    }

    return(
        <div class='comments-container'>
            <h3>Comments</h3>
            <form className = "comment-input-container" onSubmit={submitComment}>
                <input type ="text area" className="comment-box " placeholder="Write a comment..."/>
                <input type = "submit" className="add-comment-btn " value="Add"/>
            </form>
            {comments.map((comment) => {
                return <Comment comment ={comment}/>
            })
            }
        </div>
    )
}
