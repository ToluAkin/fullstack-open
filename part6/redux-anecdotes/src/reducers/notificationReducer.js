const initialState = ''

export const voteNotify = anecdote => {
    return { type: 'SET_NOTIFY', payload: anecdote.content }
}

export const removeNotify = () => {
    return { type: 'REMOVE_NOTIFY' }
}

export const addNotify = anecdote => {
    return { type: 'ADD_NOTIFY', payload: anecdote }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFY':
            return 'You voted for ' + action.payload
        case 'REMOVE_NOTIFY':
            return initialState
        case 'ADD_NOTIFY':
            return 'You added ' + action.payload
        default: return state
    }
}

export default reducer