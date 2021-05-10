import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className='welcome-block'>
                <h1 className='welcome-heading'>Welcome to MiniSurvey</h1>
                <p className='welcome-heading'>Take part in one of the most interesting surveys or create your own ones</p>
            </div>
            <div className='main-area'>
                <div className='board board1'>
                    <p className='board-title'>See All Surveys</p>
                </div>
                <div className='board board2'>
                    <p className='board-title'>Create New Surveys</p>
                </div>
                <div className='board board3'>
                    <p className='board-title'>About Us</p>
                </div>
            </div>
        </div>
    )
}

export default Home
