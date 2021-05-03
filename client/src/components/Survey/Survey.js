import React, { useState, useEffect } from 'react'
import formatDate from '../../utils/DateFormat'
import { useAuth } from '../../contexts/AuthContext'
import './Survey.css'
import SurveyOption from './SurveyOption'

export default function Survey({match}) {

    const [survey, setSurvey] = useState(null)
    const [answerID, setAnswerID] = useState(null)
    const {currentUserID} = useAuth()

    useEffect(() => {
        const fetchSurvey = async () => {
            const url = new URL('/api/surveys/', window.location)
            url.searchParams.append('surveyID', match.params.id)
            if(currentUserID !== null)
                url.searchParams.append('userID', currentUserID)
            const res = await fetch(url)
            const data = await res.json()
            if(data.answer)
                setAnswerID(data.answer.option_id)
            setSurvey(data)
        }
        fetchSurvey()
    }, [match, currentUserID])

    const submitOption = (optionID) => {
        const fetchSubmit = async () => {
            await fetch(`/api/user_answers/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userID: currentUserID,
                    surveyID: survey.survey_id,
                    optionID: optionID
                })
            })
        }
        if(currentUserID)
            fetchSubmit()
        setAnswerID(optionID)
    }

    return (
        <div className="txt-ctr">
            <div className="card survey-card card-wide">
                {
                    survey && (
                        <>
                            <h2>{survey.title}</h2>
                            <p className='survey-description'>{survey.description}</p>
                            <h3>🖋 Choose one of the followings:</h3>
                            {
                                survey.options.map((option, index) => {
                                    return <SurveyOption option={option} checked={option.option_id === answerID} submitFunc={submitOption} key={index} />
                                })
                            }
                            <p className='author-date-info'>by {survey.author} on {formatDate(new Date(survey.time))}</p>
                        </>
                    )
                }
            </div>
        </div>
    )
}
