import React, { useRef, createRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Create.css'

const Create = () => {
    const { currentUserID } = useAuth()
    const [message, setMessage] = useState()
    const [messageTimeout] = useState({})
    const [optionRefs, setOptionRefs] = useState([useRef(), useRef(), useRef()])
    const formRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()

    const submit = async (e) => {
        e.preventDefault()
        const survey = {
            authorID: currentUserID,
            title: titleRef.current.value,
            description: descRef ? descRef.current.value : "",
            options: optionRefs.map(optionRef => optionRef.current.value)
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

    const addOption = (e) => {
        e.preventDefault()
        const newRef = createRef()
        optionRefs.push(newRef)
        setOptionRefs([...optionRefs])
    }

    const removeOption = (e) => {
        e.preventDefault()
        if (optionRefs.length === 1)
            return
        optionRefs.pop()
        setOptionRefs([...optionRefs])
    }

    return (
        <div className='txt-ctr'>
            <div className='card card-wide'>
                <h2>Create New Survey</h2>
                <form onSubmit={submit} ref={formRef}>
                    <h3>Title</h3>
                    <input type='text' ref={titleRef} required placeholder='Your Title Here'></input>
                    <h3>Description</h3>
                    <textarea ref={descRef} placeholder='Your Description Here'></textarea>
                    <h3>Options 
                        <span className='option-ctrl'>
                            <button className='inline-btn' onClick={addOption}>+</button>
                            <button className='inline-btn' onClick={removeOption}>-</button>
                        </span>
                    </h3>
                    {
                        optionRefs.map((optionRef, index) => {
                            return <input type='text' key={index} ref={optionRef} required placeholder={`Option ${index + 1}`}></input>
                        })
                    }
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
