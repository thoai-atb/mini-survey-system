import React, { useState, useEffect, useRef } from 'react'
import formatDate from '../../utils/DateFormat'
import { useAuth } from '../../contexts/AuthContext'
import './Survey.css'
import SurveyOption from './SurveyOption'

export default function Survey({match}) {

    const [survey, setSurvey] = useState(null)
    const [answerID, setAnswerID] = useState(null)
    const {currentUserID} = useAuth()
    const [optionResults, setOptionResults] = useState(null)

    const previous = useRef({optionResults})

    const submitOption = async (optionID) => {
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
            await fetchSubmit()
        setAnswerID(optionID)
    }

    // ALWAYS UPDATE previous VARIABLE
    useEffect(() => {
        previous.current = {optionResults}
    })

    // FIRST FETCH TO GET THE WHOLE SURVEY WITH OPTIONS
    useEffect(() => {
        const fetchSurvey = async () => {
            const url = new URL('/api/surveys/', window.location)
            url.searchParams.append('surveyID', match.params.id)
            if(currentUserID !== null)
                url.searchParams.append('userID', currentUserID)
            const res = await fetch(url)
            const data = await res.json()
            setSurvey(data)
        }
        fetchSurvey()
    }, [match, currentUserID])

    // SECOND FETCH TO GET THE ANSWER IF EXISTS
    useEffect(() => {
        if(survey && survey.answer)
            setAnswerID(survey.answer.option_id)
    }, [survey])

    // THIRD FETCH TO GET THE STATISTIC OF THE OPTIONS IF AN ANSWER CHANGES
    useEffect(() => {
        const fetchOptionResults = async () => {
            const res = await fetch(`/api/surveys/statistics/${survey.survey_id}`)
            const data = await res.json()
            const map = {}
            for(let option of data)
                map[option.option_id] = option
            setOptionResults(map)
        }
        if (!answerID)
            return
        if (!currentUserID && previous.current.optionResults)
            return
        fetchOptionResults()
    }, [answerID, survey, currentUserID])

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
                                    return <SurveyOption 
                                        key={index} 
                                        option={option} 
                                        checked={option.option_id === answerID} 
                                        stats={optionResults ? optionResults[option.option_id] : null} 
                                        submitFunc={submitOption} 
                                    />
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
