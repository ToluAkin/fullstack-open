import React from 'react'
import Weather from './Weather'

const CountryDetail = ({ country }) => {
    let languages = country.languages.map((language, index) => {
        return <li key={ index }>{ language.name }</li>
    })
    return (
        <div>
            <h2>{ country.name }</h2>
            <p>Capital { country.capital }</p>
            <p>Population { country.population }</p>
            <h3>Languages</h3>
            <ul>{ languages }</ul>
            <img src={country.flag} alt={ country.name } style={{ height: '150px' }}></img>
            <Weather country={ country.name } />
        </div>
    )
}

export default CountryDetail