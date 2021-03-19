import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    return (
        <nav>
          <div className="nav-left">
            <div className="nav-item">
              <p>Logo</p>
            </div>
            <div className="nav-item">
              <Link to='/'>
                <p>Home</p>
              </Link>
            </div>
            <div className="nav-item">
              <Link to='/browse'>
                <p>Browse</p>
              </Link>
            </div>
            <div className="nav-item">
              <Link to='/create'>
                <p>Create</p>
              </Link>
            </div>
          </div>
          <div className="nav-item">
              <Link to='/login'>
                <p>Login</p>
              </Link>
          </div>
        </nav>
    )
}

export default Nav
