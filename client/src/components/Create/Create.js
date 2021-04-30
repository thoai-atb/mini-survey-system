import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Create.css'

const Create = () => {
    const { currentUserID } = useAuth()
    const [message, setMessage] = useState()
    const [messageTimeout] = useState({});
    const formRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const option1Ref = useRef()
    const option2Ref = useRef()
    const option3Ref = useRef()


    const submit = async (e) => {
        e.preventDefault()
        const survey = {
            authorID: currentUserID,
            title: titleRef.current.value,
            description: descRef ? descRef.current.value : "",
            options: [
                option1Ref.current.value,
                option2Ref.current.value,
                option3Ref.current.value
            ]
        }

        const res = await fetch('/api/surveys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(survey)
        })

        if (res.status !== 200) {
            console.log('Could not create survey')
            return
        }

        formRef.current.reset()
        addMessage("New Survey Created!")
    }

    const addMessage = (msg) => {
        setMessage(msg);
        window.clearTimeout(messageTimeout.time);
        messageTimeout.time = (setTimeout(() => {
            setMessage(null);
        }, 2000));
    }

    useEffect(() => {
        return () => {
            window.clearTimeout(messageTimeout.time);
            setMessage(null);
        }
    }, [messageTimeout])

    return (
        <div className='txt-ctr'>
            <div className='card'>
                <h2>Create New Survey</h2>
                <form onSubmit={submit} ref={formRef}>
                    <h3>Title</h3>
                    <input type='text' ref={titleRef} required></input>
                    <h3>Description</h3>
                    <textarea ref={descRef}></textarea>
                    <h3>Options</h3>
                    <input type='text' ref={option1Ref} required></input>
                    <input type='text' ref={option2Ref} required></input>
                    <input type='text' ref={option3Ref} required></input>
                    {
                        message && (
                            <div className='message'>{message}</div>
                        )
                    }
                    <div className='txt-ctr'>
                        <button>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create
