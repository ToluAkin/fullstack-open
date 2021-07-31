import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async e => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You created ${ content }`, 5000))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ create }>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm