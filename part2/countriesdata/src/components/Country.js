import React, { useState } from 'react'
import CountryDetail from './CountryDetail'

const Country = ({ country, index, matched }) => {
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            <p>{ country.name }
                <button onClick={handleClick}>show</button>
            </p>
            { toggle ? <CountryDetail country={ matched[index] } /> : '' }
        </div>
    )
}

export default Country