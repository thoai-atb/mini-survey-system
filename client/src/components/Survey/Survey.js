import React, { useState, useEffect } from 'react'
import formatDate from '../../utils/DateFormat'
import './Survey.css'

export default function Survey({match}) {

    const [survey, setSurvey] = useState(null)

    useEffect(() => {
        const fetchSurvey = async () => {
            const res = await fetch(`/api/surveys/${match.params.id}`)
            const data = await res.json()
            console.log(data)
            setSurvey(data)
        }
        fetchSurvey()
    }, [match])

    return (
        <div className="txt-ctr">
            <div className="card survey-card">
                {
                    survey && (
                        <>
                            <h2>{survey.title}</h2>
                            <p className='survey-description'>{survey.description}</p>
                            <h3>🖋 Choose one of the followings:</h3>
                            {
                                survey.options.map((option, index) => {
                                    return (
                                        <div className="survey-option" key={index}>
                                            {option.description}
                                        </div>
                                    )
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
