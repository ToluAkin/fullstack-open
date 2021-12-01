import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRE } from '../queries'

const Books = props => {
	const [genre, setGenre] = useState('')
	const result = useQuery(ALL_BOOKS, {
		variables: { genre },
	})
	const genresResult = useQuery(ALL_GENRE)

	if (!props.show) {
		return null
	}
	
	if (result.loading || genresResult.loading) {
		return <div>Loading...</div>
	}
	const books = result.data.allBooks
	const genres = genresResult.data.allGenre

	return (
		<div>
			<h2>Books</h2>
			<h4>{ genre ? `Genre ${ genre }`: 'All genre'}</h4>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{ books.map(book =>
						<tr key={ book.title }>
							<td>{ book.title }</td>
							<td>{ book.author.name.charAt(0).toUpperCase() + book.author.name.slice(1) }</td>
							<td>{ book.published }</td>
						</tr>
					) }
				</tbody>
			</table>
			{
				genres.map(genre =>
					<button key={ genre } type="button"
							onClick={ () => result.refetch({ genre }) }
							onChange={ ({ target }) => setGenre(target) }>
						{ genre }
					</button>
				)
			}
			<button type="button" onClick={ () => result.refetch({ genre }) }
					onChange={ ({ target }) => setGenre('')}>all genres</button>
		</div>
	)
}

export default Books