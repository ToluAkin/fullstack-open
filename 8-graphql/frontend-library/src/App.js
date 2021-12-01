import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
// components
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const [error, setError] = useState('')
	const client = useApolloClient()

	useEffect(() => {
		const savedToken = localStorage.getItem('user-token')
		savedToken && setToken(savedToken)
	}, [])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={ () => setPage('authors') }>authors</button>
				<button onClick={ () => setPage('books') }>books</button>
				
				{
					token
						?
							<>
								<button onClick={ () => setPage('add') }>add book</button>
								<button onClick={ () => setPage('recommend') }>recommendation</button>
								<button onClick={ logout }>logout</button>
							</>
						: 	<button onClick={ () => setPage('login') }>login</button>
				}
			</div>

			{
				error && <p>{ error }</p>
			}

			<Authors show={ page === 'authors' } />
			<Books show={ page === 'books' } />
			<NewBook show={ page === 'add' } />
			<Recommendation show={ page === 'recommend' } />
			{ !token && <Login show={ page === 'login' } setToken={ setToken } setError={ setError } /> }
		</div>
	)
}

export default App