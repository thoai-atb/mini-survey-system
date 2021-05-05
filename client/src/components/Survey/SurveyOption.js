import React from 'react'

export default function SurveyOption({option, submitFunc, checked, stats}) {

    const onClick = () => {
        if(!checked)
            submitFunc(option.option_id)
    }

    return (
        <div className={"survey-option" + (checked ? " survey-option-checked" : "")} onClick={onClick}>
            {option.description}
            { 
                stats && (
                    <div className='survey-option-stats'>
                       {stats.percentage.toFixed(1)}% ({stats.answer_count})
                    </div>
                )
            }
        </div>
    )

}
