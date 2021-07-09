import React, { useState, useEffect } from 'react'

//components
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(response => {
            setBlogs(response.data)
            if (response.status === 500) handleLogOut()
        })
    }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async e => {
        e.preventDefault()
        const userAuth = { 'username': username.toLowerCase(), password }
        try {
            const user = await loginService.login(userAuth)
            setUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            setNotificationMessage('invalid username or password')
            setTimeout(() => { setNotificationMessage(null) }, 5000)
        }
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        window.localStorage.clear()
        setUser(null)
    }

    if (user === null) {
        return (
            <div>
                <h1>Login to application</h1>
                <Notification message={ notificationMessage } />
                <form onSubmit={ handleLogin }>
                    <div>
                        Username:
                        <input name="Username" type="text" value={ username } onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        Password
                        <input name="Password" type="password" value={ password } onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <AddBlog
                user={ user }
                handleLogOut={ handleLogOut }
                blogs={ blogs }
            />
        )
    }
}

export default App