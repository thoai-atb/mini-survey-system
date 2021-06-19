import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './style.css'

const PasswordReset = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth() 
    const emailRef = useRef(null);
    const history = useHistory();

    const handler = async (e) => {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setLoading(false)
            history.push('/')
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }

    return (
        <div className='txt-ctr'>
            <div className='card login-form'>
                <h2>Reset Password</h2>
                <form onSubmit={handler}>
                    <h3>Email</h3>
                    <input type='email' required ref={emailRef}></input>
                    {
                        error && (
                            <div className='error-msg'>{error}</div>
                        )
                    }
                    <div className='txt-ctr'>
                        <button disabled={loading}>Send Vertification</button>
                    </div>
                </form>
            </div>
            <div className="post-form-message">
                Back to <Link style={{textDecoration: 'none'}} to='/login'>Log In</Link>
            </div>
        </div>
    )
}

export default PasswordReset
