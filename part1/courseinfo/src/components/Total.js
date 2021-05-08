import React from 'react'

const Total = (props) => {
    const values = props.parts.map(prop => prop.exercises)
    const sum = values.reduce((a,b) => {
        return a + b
    })
    return (
        <p>Number of exercises { sum }</p>
    )
}

export default Total