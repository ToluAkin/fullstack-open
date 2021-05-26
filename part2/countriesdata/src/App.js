import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [ country, setCountry ] = useState('')
	const [ countries, setCountries ] = useState([])
	const [ matched, setMatched ] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

	const handleInput = (e) => {
		setCountry(e.target.value);
		let result = countries.filter(singleCountry => {
			return singleCountry.name.toLowerCase().includes(country)
		});
		setMatched(result);
	}
	
	let matchedCountries;
	if (matched.length === 1) {
		let oneCountry = matched[0]
		let languages = oneCountry.languages.map((language, index) => {
			return <li key={ index }>{ language.name }</li>
		})
		matchedCountries =
			<div>
				<h2>{ oneCountry.name }</h2>
				<p>Capital { oneCountry.capital }</p>
				<p>Population { oneCountry.population }</p>
				<h3>Languages</h3>
				<ul>{ languages }</ul>
			<img src={oneCountry.flag} alt={oneCountry.name} style={{ height: '200px' }}></img>
			</div>
	} else if (matched.length > 0 && matched.length <= 10) {
		matchedCountries = matched.map(item => {
			return <p key={item.numericCode}>{item.name}</p>
		})
	} else if (matched.length > 10) {
		matchedCountries = <p>Too many matches, specify another filter</p>
	}

	return (
		<div> 
			<span>find countries</span>
			<input value={country} onInput={handleInput} />
			{ matchedCountries }
        </div>
	)
}

export default App;
