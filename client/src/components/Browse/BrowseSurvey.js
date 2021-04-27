import React from 'react'
import { useHistory } from 'react-router-dom'
import './Browse.css'

export default function BrowseSurvey({surveyID, title}) {

    const history = useHistory()

    const goToSurvey = () => {
        console.log(`going to survey ${title} (id = ${surveyID})`)
        history.push(`/survey/${surveyID}`)
    }

    return (
        <div onClick={goToSurvey} className='browse-survey'>
            <div className="survey-title">{title}</div>
            <div className="surver-footer">
                <div className="survey-date-info">3/28/2021</div>
                <div className="survey-author-info">John Wick</div>
            </div>
        </div>
    )
}
