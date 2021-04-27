import React, { useState, useEffect } from 'react'
import './Survey.css'

export default function Survey({match}) {

    const [survey, setSurvey] = useState({title: 'loading...'})

    useEffect(() => {
        const fetchSurvey = async () => {
            const res = await fetch(`/api/surveys/${match.params.id}`)
            const data = await res.json()
            setSurvey(data[0])
        }
        fetchSurvey()
    }, [match])

    return (
        <div className="txt-ctr">
            <div className="card survey-card">
                <h2>{survey.title}</h2>
                <p className='survey-description'>{survey.description}</p>
                <h3>🖋 Choose one of the followings:</h3>
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
