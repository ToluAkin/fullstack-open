import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (e) => {
            setError(e.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data]) // eslint-disable-line


    const submit = async e => {
        e.preventDefault()

        login({ variables: { username, password } })
    }

    if (!show) {
		return null
    }

    if (result.loading) {
		return <div>Loading...</div>
    }

    
    return (
        <div>
            <h4>Login</h4>
            <form onSubmit={ submit }>
                <div>
                    <label htmlFor='username'>Username: </label><br/>
                    <input name="username" id="username" value={ username }
                        onChange={ ({ target }) => setUsername(target.value) }
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label><br/>
                    <input name="password" id="password" type="password" value={ password }
                        onChange={ ({ target }) => setPassword(target.value) }
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        
    )
}

export default Login