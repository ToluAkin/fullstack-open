import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ handleCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submit = async e => {
        await handleCreate(e, { title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h1>Create a new blog</h1>
            <form onSubmit={ submit }>
                <label htmlFor="title">title:</label>
                <input name="title" id="title" type="text" value={ title } onChange={({ target }) => setTitle(target.value)} />
                <label htmlFor="author">author:</label>
                <input name="author" id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
                <label htmlFor="url">url:</label>
                <input name="url" id="url" type="text" value={ url } onChange={({ target }) => setUrl(target.value)} />
                <button id="create" type="submit">Create</button>
            </form>
        </div>
    )
}

AddBlog.propTypes = { handleCreate: PropTypes.func.isRequired }
export default AddBlog