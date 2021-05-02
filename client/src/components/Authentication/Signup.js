import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './style.css'

const Signup = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth() 
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const nameRef = useRef(null);
    const conPassRef = useRef(null);
    const history = useHistory();


    const handler = async (e) => {
        e.preventDefault();
        
        if(passRef.current.value !== conPassRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            let res = await signup(emailRef.current.value, passRef.current.value)
            await signupBackend(res.user.uid)
            setLoading(false)
            history.push('/')
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }

    const signupBackend = async (uid) => {
        let newUser = {
            email: emailRef.current.value,
            username: nameRef.current.value,
            userToken: uid
        }
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
    }

    return (
        <div className='txt-ctr'>
            <div className='card login-form'>
                <h2>Sign Up</h2>
                <form onSubmit={handler}>
                    <h3>Username</h3>
                    <input type='text' required ref={nameRef}></input>
                    <h3>Email</h3>
                    <input type='email' required ref={emailRef}></input>
                    <h3>Password</h3>
                    <input type='password' required ref={passRef}></input>
                    <h3>Confirm Password</h3>
                    <input type='password' required ref={conPassRef}></input>
                    {
                        error && (
                            <div className='error-msg'>{error}</div>
                        )
                    }
                    <div className='txt-ctr'>
                        <button disabled={loading}>Sign Up</button>
                    </div>
                </form>
            </div>
            <div className="post-form-message">
                Already have an account? <Link style={{textDecoration: 'none'}} to='/login'>Log In</Link>
            </div>
        </div>
    )
}

export default Signup

