import React from 'react'
import './Survey.css'

export default function Survey() {
    return (
        <div className="txt-ctr">
            <div className="card">
                <h2>Survey Title</h2>
                <hr></hr>
                <p>Survey Description: What is love? Baby don't hurt me, don't hurt me, no more.</p>
                <hr></hr>
                <h3>Choose one of the followings:</h3>
                <div className="survey-option">
                    option 1
                </div>
                <div className="survey-option">
                    option 2
                </div>
                <div className="survey-option">
                    option 3
                </div>
            </div>
        </div>
    )
}
