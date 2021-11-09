import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import { Box, Button, TextField } from '@mui/material'

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
            <Box component="form" autoComplete="off" onSubmit={ submit } noValidate
                 sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', alignItems: 'center' }}
            >
                <TextField id="title" label="Title" variant="outlined" value={ title } onChange={ ({ target }) => setTitle(target.value) } />
                <TextField id="author" label="Author" variant="outlined" value={author} onChange={ ({ target }) => setAuthor(target.value) } />
                <TextField id="url" label="Url" variant="outlined" value={ url } onChange={ ({ target }) => setUrl(target.value) } />
                <Button variant='outlined' id="create" type="submit">Create</Button>
            </Box>
        </Togglable>
    )
}

export default AddBlog