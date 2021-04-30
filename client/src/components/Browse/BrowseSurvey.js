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
            <div className="survey-title">{title}</div>
            <div className="surver-footer">
                <div className="survey-date-info">{formatDate(date)}</div>
                <div className="survey-author-info">{author}</div>
            </div>
        </div>
    )
}
