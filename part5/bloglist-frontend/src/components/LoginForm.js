import React from 'react'

import Notification from '../components/Notification'

const LoginForm = ({
    notificationMessage,
    handleLogin,
    handleNameChange,
    username,
    handlePasswordChange,
    password
}) => {
    return (
        <div>
            <h1>Login to application</h1>
            <Notification message={ notificationMessage } />
            <form onSubmit={ handleLogin }>
                <div>
                    Username:
                    <input name="username" type="text" value={ username }
                        onChange={ handleNameChange } />
                </div>
                <div>
                    Password:
                    <input name="password" type="password" value={ password }
                        onChange={ handlePasswordChange } />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm