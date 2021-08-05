import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { anecdoteFilter } from '../reducers/filterReducer'

const Filter = props => {
    const textInput = useRef()

    const handleChange = () => {
        const filter = textInput.current.value.toLowerCase()
        props.anecdoteFilter(filter)
    }
        
    const style = { marginBottom: 10 }

    return (
        <div style={ style }>
            <label>Filter </label>
            <input onChange={ handleChange } ref={ textInput } />
        </div>
    )
}

const ConnectedFilter = connect(null, { anecdoteFilter })(Filter)

export default ConnectedFilter