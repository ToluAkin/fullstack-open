import React from 'react'

const Form = ({ country, handleInput } ) => {
    return (
        <div>
            <span>find countries</span>
			<input value={ country } onInput={ handleInput } />
        </div>
    )
}

export default Form