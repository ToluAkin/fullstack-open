import React from 'react'

const Person = props => {
    let names = props.persons.map((person, index) =>
        <li key={index}>{person.name} {person.number} <button data-id={ person.id } onClick={props.handleDelete}>delete</button></li>
    )
    return (
        <ul>
            { names }
        </ul>
        
    )
}

export default Person