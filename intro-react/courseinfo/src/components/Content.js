import React from 'react'

const Content = (props) => {
    return (
        props.parts.map(
            prop => <p> {prop.name} {prop.exercises} </p>
        )
    )
}

export default Content