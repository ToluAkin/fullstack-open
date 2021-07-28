import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotify, removeNotify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = e => {
        e.preventDefault()
        console.log(e.target)
        const content = e.target.content.value
        e.target.value = ''
        dispatch(createAnecdote(content))
        dispatch(addNotify(content))
        setTimeout(() => dispatch(removeNotify()), 5000)
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