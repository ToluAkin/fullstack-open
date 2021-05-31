import React from 'react'
import CountryDetail from './CountryDetail'
import Country from './Country'

const SearchResult = ({ matched, handleShow }) => {
	if (matched.length === 1) {
		return (
			<CountryDetail country={matched[0]} />
		)
	} else if (matched.length <= 10) {
		return (
			matched.map((country, index) => 
				<Country country={ country } index={ index } matched={ matched } key={index} />
			)
		)
	} else if (matched.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
    }
}

export default SearchResult