import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { login } = useAuth() 
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const history = useHistory();

    const handler = async (e) => {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
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
                <h2>Login</h2>
                <form onSubmit={handler}>
                    <h3>Email</h3>
                    <input type='email' ref={emailRef}></input>
                    <h3>Password</h3>
                    <input type='password' ref={passRef}></input>
                    {
                        error && (
                            <div className='error-msg'>{error}</div>
                        )
                    }
                    <div className='txt-ctr'>
                        <button disabled={loading}>Log In</button>
                    </div>
                </form>
            </div>
            <div className="post-form-message">
                Don't have an account? <Link style={{textDecoration: 'none'}} to='/signup'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
