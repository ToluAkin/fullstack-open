import React, { useState, useEffect } from 'react'
import axios from '../../../6-state-management-redux/redux-anecdotes/node_modules/axios'
import Form from './components/Form'
import SearchResult from './components/SearchResult'

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

	const handleInput = e => {
		setCountry(e.target.value);
		let result = countries.filter(singleCountry => {
			return singleCountry.name.toLowerCase().includes(country)
		});
		setMatched(result);
	}

	return (
		<div>
			<Form country={ country } handleInput={ handleInput } />
			<SearchResult matched={ matched } />
        </div>
	)
}

export default App;
