import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddBlog = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = () => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog({ title, author, url }))
            dispatch(setNotification(`a new blog ${ title } by ${ author } added`))
        } catch (error) {
            console.log(error)
        }
    }

    const submit = async e => {
        e.preventDefault()
        await handleCreate()
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Togglable buttonLabel="create new blog" ref={ blogFormRef }>
            <h1>Create a new blog</h1>
            <form onSubmit={ submit }>
                <label htmlFor="title">title:</label>
                <input name="title" id="title" type="text" value={ title } onChange={ ({ target }) => setTitle(target.value) } />
                <label htmlFor="author">author:</label>
                <input name="author" id="author" type="text" value={author} onChange={ ({ target }) => setAuthor(target.value) } />
                <label htmlFor="url">url:</label>
                <input name="url" id="url" type="text" value={ url } onChange={ ({ target }) => setUrl(target.value) } />
                <button id="create" type="submit">Create</button>
            </form>
        </Togglable>
    )
}

export default AddBlog