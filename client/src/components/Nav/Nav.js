import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import './Nav.css'
import logo from "./minisurvey.png"

const Nav = () => {
    const { currentUser } = useAuth()
    return (
        <nav>
          <div className="nav-left">
            <div className="nav-item">
              <img height="50px" src={logo} alt="logo"></img>
            </div>
            <div className="nav-item">
              <Link style={{textDecoration: 'none'}} to='/'>
                <p>Home</p>
              </Link>
            </div>
            <div className="nav-item">
              <Link style={{textDecoration: 'none'}} to='/browse'>
                <p>Browse</p>
              </Link>
            </div>
            <div className="nav-item">
              <Link style={{textDecoration: 'none'}} to='/create'>
                <p>Create</p>
              </Link>
            </div>
          </div>
          {
            currentUser && (
              <div className="nav-item">
                <Link style={{textDecoration: 'none'}} to='/profile'>
                  <p>{currentUser.email}</p>
                </Link>
              </div>
            )
          }
          {
            !currentUser && (
              <div className="nav-item">
                <Link style={{textDecoration: 'none'}} to='/login'>
                  <p>Login</p>
                </Link>
              </div>
            )
          }
          
        </nav>
    )
}

export default Nav
