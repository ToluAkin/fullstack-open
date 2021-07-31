import React from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = e => {
        const filter = e.target.value
        e.target.value = ''
        dispatch(anecdoteFilter(filter))
        return filter
    }
        
    const style = { marginBottom: 10 }

    return (
        <div style={style}>
            <label>Filter </label>
            <input onChange={ handleChange } />
        </div>
    )
}

export default Filter