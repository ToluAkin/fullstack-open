const initialState = null

export const signedInUser = user => {
    return async dispatch => {
        dispatch({ type: 'SIGN_IN', data: user })
    }
}

export const signOut = () => {
    return async dispatch => {
        dispatch({ type: 'SIGN_OUT' })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.data
        case 'SIGN_OUT':
            return initialState
        default: return state
    }
}

export default reducer