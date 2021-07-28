import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotify, removeNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter == 'ALL') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
        
    })
    const dispatch = useDispatch()

    const castVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(voteNotify(anecdote))
        setTimeout(() => dispatch(removeNotify()), 5000)
    }

    return (
        <div>
        { anecdotes.map(anecdote =>
            <ul key={ anecdote.id }>
                <li>{ anecdote.content }</li>
                <span>has {anecdote.votes} </span>
                <span> <button onClick={() => castVote(anecdote)}>vote</button></span>
            </ul>
        ) }
        </div>
    )
}

export default AnecdoteList