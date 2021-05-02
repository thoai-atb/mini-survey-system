import React from 'react'
import { useHistory } from 'react-router-dom'
import formatDate from '../../utils/DateFormat'
import './Browse.css'

export default function BrowseSurvey({surveyID, title, author, date}) {

    const history = useHistory()

    const goToSurvey = () => {
        history.push(`/survey/${surveyID}`)
    }

    return (
        <div onClick={goToSurvey} className='browse-survey'>
            <div className="browse-survey-title">{title}</div>
            <div className="survey-done-indicator">Answered</div>
            <div className="browse-surver-footer">
                <div className="browse-survey-date-info">{formatDate(date)}</div>
                <div className="browse-survey-author-info">{author}</div>
            </div>
        </div>
    )
}
