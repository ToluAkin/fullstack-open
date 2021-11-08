const initialState = ''

export const setNotification = (content, duration = 5000) => {
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', payload: content })
        setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), duration)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return initialState
        default: return state
    }
}

export default reducer