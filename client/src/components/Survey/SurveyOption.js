import React from 'react'

export default function SurveyOption({option, submitFunc}) {

    return (
        <div className="survey-option" onClick={() => submitFunc(option.option_id)}>
            {option.description}
        </div>
    )

}
