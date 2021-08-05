const initialState = ''
let holdTime = []
export const setNotification = (content, duration) => {
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFY', payload: content })
        const timer = setTimeout(() => dispatch({ type: 'REMOVE_NOTIFY' }), duration)
        holdTime.push(timer)
        if (holdTime.length > 1) {
            for (let i = 0; i < holdTime.length - 1; i++) {
                clearTimeout(holdTime[i])
            }
            setTimeout(() => holdTime = [], duration)
        }
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