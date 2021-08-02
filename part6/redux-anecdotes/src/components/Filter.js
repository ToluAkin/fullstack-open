import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const textInput = useRef()

    const handleChange = () => {
        const filter = textInput.current.value.toLowerCase()
        dispatch(anecdoteFilter(filter))
    }
        
    const style = { marginBottom: 10 }

    return (
        <div style={ style }>
            <label>Filter </label>
            <input onChange={ handleChange } ref={ textInput } />
        </div>
    )
}

export default Filter