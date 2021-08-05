import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const initialState = { good: 0, ok: 0, bad: 0 }

const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            return state
        case 'OK':
            return state
        case 'BAD':
            return state
        case 'ZERO':
            return state
    }
    return state
}
export default counterReducer

const App = () => {
    const good = () => { store.dispatch({ type: 'GOOD' }) }
    const neutral = () => { store.dispatch({ type: 'OK' }) }
    const bad = () => { store.dispatch({ type: 'BAD' }) }
    const reset = () => { store.dispatch({ type: 'ZERO' }) }

    return (
        <div>
            <button onClick={ good }>good</button> 
            <button onClick={ neutral }>neutral</button> 
            <button onClick={ bad }>bad</button>
            <button onClick={ reset }>reset stats</button>
            <div>good { store.getState().good }</div>
            <div>neutral { store.getState().ok }</div>
            <div>bad { store.getState().bad }</div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)