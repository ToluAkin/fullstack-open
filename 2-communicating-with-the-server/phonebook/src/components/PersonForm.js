import React from 'react'

const PersonForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input value={props.copyNewName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.copyNewNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm