import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
    const create = async e => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.value = ''
        props.createAnecdote(content)
        props.setNotification(`You created ${ content }`, 5000)
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

const mapDispatchToProps = { createAnecdote, setNotification }
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm