import React from 'react'
import './Create.css'

const Create = () => {
    return (
        <div className='create'>
            <h1>Create</h1>
            <div className='create-form'>
                <h2>Create New Survey</h2>
                <form>
                    <h3>Title</h3>
                    <input type='text'></input>
                    <h3>Description</h3>
                    <textarea></textarea>
                    <h3>Options</h3>
                    <input type='text'></input>
                    <input type='text'></input>
                    <input type='text'></input>
                    <button>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create
