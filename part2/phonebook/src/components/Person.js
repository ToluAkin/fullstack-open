import React from 'react'

const Person = props => {
    let names = props.persons.map((person, index) => <li key={index}>{person.name} { person.number}</li>)
    return (
        <div>
            { names }
        </div>
        
    )
}

export default Person