import query from '../services/anecdotes'

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await query.getAll()
        dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await query.createNew(content)
        dispatch({ type: 'CREATE', data: newAnecdote })
    }
}

export const voteAnecdote = content => {
    return async dispatch => {
        const updatedObject = { ...content, votes: content.votes + 1 }
        const updatedAnecdote = await query.voteUp(updatedObject)
        dispatch({ type: 'VOTE', data: updatedAnecdote })
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'CREATE':
            return state.concat(action.data)
        case 'VOTE':
            const id = action.data.id
            // eslint-disable-next-line eqeqeq
            const theAnecdote = state.find(anecdote => anecdote.id == id)
            const changedAnecdote = { ...theAnecdote, votes: theAnecdote.votes + 1 }
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
        default: return state
    }
}

export default reducer