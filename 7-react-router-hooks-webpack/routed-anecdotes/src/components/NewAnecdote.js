// import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
    const history = useHistory()
    // const text = 'text'
    const content = useField()
    const author = useField()
    const info = useField()
    const reset = useField('reset')
    
    const handleSubmit = e => {
        e.preventDefault()
        const newContent = {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        }
        addNew({ ...newContent })
        history.push('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={ handleSubmit }>
                <p>
                    <label htmlFor="content">content</label><br />
                    <input name='content' { ...content } />
                </p>
                <p>
                    <label htmlFor="author">author</label><br />
                    <input name='author' { ...author } />
                </p>
                <p>
                    <label>url for more info</label><br />
                    <input name='info' { ...info } />
                </p>
                    
                {/* <div>
                    <button type="submit">Create</button> */}
                    <input { ...reset } value="Reset" />
                {/* </div> */}
            </form>
        </div>
    )
}

export default CreateNew