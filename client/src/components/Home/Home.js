import React from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const history = useHistory()
    return (
        <div>
            <div className='welcome-block'>
                <h1 className='welcome-heading'>Welcome to MiniSurvey</h1>
                <p className='welcome-heading'>Take part in one of the most popular surveys or create your own ones</p>
            </div>
            <div className='main-area'>
                <div className='board board1'>
                    <p className='board-title'>See All Surveys</p>
                    <p>Check out all surveys created from variety of users.</p>
                    <p>Here you can search for surveys that you are interested in.</p>
                    <p>After taking a survey, you will see the statistics of other survey takers.</p>
                    <p>Your answers will be recorded for the statistics but kept private for others.</p>
                    <button onClick={() => history.push('/browse')}>Go To Surveys</button>
                </div>
                <div className='board board2'>
                    <p className='board-title'>Create New Surveys</p>
                    <p>You can create your own surveys, the public will see it.</p>
                    <p>Find out what other people like or dislike, their behaviors and knowledge.</p>
                    <p>You can change the number of options in a survey.</p>
                    <p>Read the surveys' comments for feedback and for discussions.</p>
                    <button onClick={() => history.push('/create')}>Create New Survey</button>
                </div>
                <div className='board board3'>
                    <p className='board-title'>About Us</p>
                    <p>This web application was developed by: Thoai, Hoang, Anh, Son.</p>
                    <p>The purpose is to help people gain info from various subjects from others.</p>
                    <p>You can always contact us by reaching out for our website (feedbacks, bug reports, discussions, etc.)</p>
                    <p>Visit our team here:</p>
                    <button onClick={() => window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>Contact Us</button>
                </div>
            </div>
        </div>
    )
}

export default Home
