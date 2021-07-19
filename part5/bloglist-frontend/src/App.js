import React, { useState, useEffect, useRef } from 'react'

//components
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => { blogService.getAll().then(blogsArray => setBlogs(blogsArray)) }, [])
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

    const blogFormRef = useRef()
    const handleCreate = async (e, newObject) => {
        e.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            await blogService.create(newObject)
            const updatedBlogs = await blogService.getAll()
            setBlogs(updatedBlogs)
            setNotificationMessage(`a new blog ${ newObject.title } by ${ newObject.author } added`)
            setTimeout(() => { setNotificationMessage(null) }, 5000)
        } catch (error) {
            console.log(error)
            setNotificationMessage(error)
        }
    }

    if (user === null) {
        return (
            <LoginForm
                notificationMessage={ notificationMessage }
                handleLogin={ handleLogin }
                handleNameChange={({ target }) => setUsername(target.value)}
                username={ username }
                handlePasswordChange={({ target }) => setPassword(target.value)}
                password={ password }
            />
        )
    } else {
        return (
            <section>
                <h2>blogs</h2>
                <Notification message={ notificationMessage } />
                <p>{ user.username } logged in</p>
                <button type="submit" onClick={ handleLogOut }>logout</button>
                <p />
                <Togglable buttonLabel="create new blog" ref={ blogFormRef } >
                    <AddBlog handleCreate={ handleCreate } />
                </Togglable>
                { blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={ blog.id } blog={ blog } user={ user } />)}
            </section>
        )
    }
}

export default App