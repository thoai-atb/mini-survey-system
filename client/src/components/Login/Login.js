import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div className='txt-ctr'>
            <div className='form login-form'>
                <h2>Login</h2>
                <form>
                    <h3>Email</h3>
                    <input type='text'></input>
                    <h3>Password</h3>
                    <input type='text'></input>
                    <div className='txt-ctr'>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
