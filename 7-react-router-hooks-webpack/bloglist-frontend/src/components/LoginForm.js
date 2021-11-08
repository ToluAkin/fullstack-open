import React from 'react'

import Notification from '../components/Notification'

const LoginForm = ({ handleLogin, handleNameChange, username, handlePasswordChange, password }) => {

    return (
        <div>
            <h1>Login to application</h1>
            <Notification />
            <form onSubmit={ handleLogin }>
                <div>
                    Username:
                    <input name="username" id="username" type="text" value={ username }
                        onChange={ handleNameChange } />
                </div>
                <div>
                    Password:
                    <input name="password" id="pswd" type="password" value={ password }
                        onChange={ handlePasswordChange } />
                </div>
                <button id="loginButton" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm