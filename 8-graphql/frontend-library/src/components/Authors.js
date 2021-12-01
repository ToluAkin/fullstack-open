import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = props => {
	const result = useQuery(ALL_AUTHORS)
	const [name, setAuthor] = useState('')
	const [setBornTo, setYear] = useState('')
	const [updateYear] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS } ] })
	
	if (!props.show) {
		return null
	}

	const submit = async e => {
		console.log(e);
		await updateYear({ variables: { name, setBornTo } })
		setAuthor('')
		setYear('')
	}
	
	if (result.loading) {
		return <div>Loading...</div>
	}

	const authors = result.data.allAuthors

  	return (
		<div>
			<h2>Authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{ authors.map(author =>
						<tr key={ author.name }>
							<td>{ author.name.charAt(0).toUpperCase() + author.name.slice(1) }</td>
							<td>{ author.born }</td>
							<td>{ author.bookCount }</td>
						</tr>
					) }
				</tbody>
			</table>
				
			<form onSubmit={ submit }>
				<h3>Set Author's birth year</h3>
				<label>Name</label>
				<select name="author" value={ name } onChange={ ({ target }) => setAuthor(target.value) }>
					<option>Select Author</option>
					{
						authors.map((author, i) => (
							<option key={ i } value={ author.name }>{ author.name }</option>
						))
					}
				</select>
					
				<label>Year</label>
				<input name="year" value={ setBornTo } onChange={ ( {target }) => setYear(+target.value) } />
					
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default Authors
