import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'
import logo from "./minisurvey.png"

const Nav = () => {
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
          <div className="nav-item">
              <Link style={{textDecoration: 'none'}} to='/login'>
                <p>Login</p>
              </Link>
          </div>
        </nav>
    )
}

export default Nav
