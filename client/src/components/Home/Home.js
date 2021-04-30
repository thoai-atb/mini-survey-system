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
                <div className='board'>See All Surveys</div>
                <div className='board'>Create New Surveys</div>
                <div className='board'>About Us</div>
            </div>
        </div>
    )
}

export default Home
