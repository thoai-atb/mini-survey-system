import React from 'react'

export default function SurveyOption({option, submitFunc, checked}) {

    return (
        <div className={"survey-option" + (checked ? " survey-option-checked" : "")} onClick={() => submitFunc(option.option_id)}>
            {option.description}
        </div>
    )

}
