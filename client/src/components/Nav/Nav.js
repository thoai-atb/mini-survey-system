import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import './Nav.css'
import logo from "./minisurvey.png"

const Nav = () => {
    const [userName, setUserName] = useState()
    const { currentUser, getUserName } = useAuth()

    useEffect(() => {
      const fetchUserName = async () => {
        const name = await getUserName()
        setUserName(name)
      }
      fetchUserName()
    }, [getUserName])

    return (
        <nav>
          <div className="nav-left">
            <div className="nav-item">
              <img height="50px" src={logo} alt="logo"></img>
            </div>
            <div className="nav-item">
              <NavLink className='navlink' activeClassName='navlink-active' to='/' exact>
                <div className='navlink-button'>
                  <p>Home</p>
                </div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className='navlink' activeClassName='navlink-active' to='/browse'>
                <div className='navlink-button'>
                  <p>Browse</p>
                </div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className='navlink' activeClassName='navlink-active' to='/create'>
                <div className='navlink-button'>
                  <p>Create</p>
                </div>
              </NavLink>
            </div>
          </div>
          {
            currentUser && (
              <div className="nav-item">
                <NavLink className='navlink' activeClassName='navlink-active' to='/profile'>
                  <div className='navlink-button'>
                    <p>{userName}</p>
                  </div>
                </NavLink>
              </div>
            )
          }
          {
            !currentUser && (
              <div className="nav-item">
                <NavLink className='navlink' activeClassName='navlink-active' to='/login'>
                  <div className='navlink-button'>
                    <p>Login</p>
                  </div>
                </NavLink>
              </div>
            )
          }
          
        </nav>
    )
}

export default Nav
