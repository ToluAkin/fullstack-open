import './App.css'
import React , {useState, useEffect} from 'react'

const App = () => {
	const [ country, setCountry ] = useState('')
	const [countries, setCountries] = useState([])
	
	let copyCountry = country
	let copyCountries = countries

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

	const handleInput = (e) => {
        setCountry(e.target.value)
        let matchedCountries = []
        copyCountries.forEach(item => {
            let matched = item.name.toLowerCase().includes(country)
            if (matched) {
                matchedCountries.push(item)
                if (matchedCountries.length === 1) {
                    let oneCountry = matchedCountries[0]
                    let languages = oneCountry.languages.map(language => {
                        return <li>{ language.name }</li>
                    })
                    return (
                        <div>
                            <h2>{oneCountry.name}</h2>
                            <p>Capital {oneCountry.capital}</p>
                            <p>Population {oneCountry.population}</p>
                            <h3>Languages</h3>
                            <ul>{ languages }</ul>
                            <img src={ oneCountry.flag } alt={oneCountry.name}></img>
                        </div>
                    )
                } else if (matchedCountries.length > 0 && matchedCountries.length <= 10) {
                    return (
                        matchedCountries.map(item => {
                            return <p key={item.numericCode}>{item.name}</p>
                        })
                    )
                } else if (matchedCountries.length > 10) {
                    return (
                        <p>Too many matches, specify another filter</p>
                    )
                }
            }
        })
    }

	return (
		<div> find countries
            <input value={copyCountry} onInput={handleInput} />
        </div>
	)
}

export default App;
