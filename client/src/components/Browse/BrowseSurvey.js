import React from 'react'
import { useHistory } from 'react-router-dom'
import formatDate from '../../utils/DateFormat'
import './Browse.css'

export default function BrowseSurvey({survey}) {

    const history = useHistory()

    const goToSurvey = () => {
        history.push(`/survey/${survey.survey_id}`)
    }

    return (
        <div onClick={goToSurvey} className='browse-survey'>
            <div className="browse-survey-title">{survey.title}</div>
            {
                survey.answer && (<div className="browse-survey-done-indicator">Answered</div>)
            }
            <div className="browse-surver-footer">
                <div className="browse-survey-date-info">{formatDate(new Date(survey.time))}</div>
                <div className="browse-survey-answers-info">Answers: <strong>{survey.total_answered}</strong></div>
                <div className="browse-survey-author-info">{survey.author}</div>
            </div>
        </div>
    )
}
