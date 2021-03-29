import React from 'react'
import './Create.css'

const Create = () => {
    return (
        <div className='txt-ctr'>
            <div className='card'>
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
                    <div className='txt-ctr'>
                        <button>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create
