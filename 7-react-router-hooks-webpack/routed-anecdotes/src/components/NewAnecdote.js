import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateNew = ({ addNew }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    const history = useHistory()
    
    const handleSubmit = e => {
        e.preventDefault()
        addNew({ content, author, info, votes: 0 })
        history.push('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={ handleSubmit }>
                <p>
                    <label htmlFor="content">content</label><br />
                    <input name='content' value={content} onChange={ e => setContent(e.target.value) } />
                </p>
                <p>
                    <label htmlFor="author">author</label><br />
                    <input name='author' value={author} onChange={ e => setAuthor(e.target.value) } />
                </p>
                <p>
                    <label>url for more info</label><br />
                    <input name='info' value={info} onChange={ e => setInfo(e.target.value) } />
                </p>
                    
                <div><button type="submit">create</button></div>
            </form>
        </div>
    )
}

export default CreateNew