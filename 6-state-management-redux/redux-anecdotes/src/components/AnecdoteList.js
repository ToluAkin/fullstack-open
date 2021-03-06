import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes.sort((a, b) => b.votes - a.votes)
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
        }
    })

    const dispatch = useDispatch()

    const castVote = anecdote => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted for ${ anecdote.content }`, 5000))
    }

    return (
        <div>
            <ul>
                { anecdotes.map((anecdote, index) =>
                    <div key={ index }>
                        <li>{ anecdote.content }</li>
                        <span>has { anecdote.votes } </span>
                        <span> <button onClick={ () => castVote(anecdote) }>vote</button></span>
                    </div>
                ) }
            </ul>
        </div>
    )
}

export default AnecdoteList