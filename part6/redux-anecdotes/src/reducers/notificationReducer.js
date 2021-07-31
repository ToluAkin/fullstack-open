const initialState = ''

export const setNotification = (content, duration) => {
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFY', payload: content })
        setTimeout(() => dispatch({ type: 'REMOVE_NOTIFY' }), duration)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFY':
            return action.payload
        case 'REMOVE_NOTIFY':
            return initialState
        default: return state
    }
}

export default reducer