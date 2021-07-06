import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({ username, password})
            setUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error);
            setNotificationMessage('invalid username or password')
            setTimeout(() => { setNotificationMessage(null) }, 5000)
        }
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        window.localStorage.clear()
        setUser(null)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        await blogService.create({ title, author, url })
        setNotificationMessage(`a new blog ${ title } by ${ author } added`)
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
            <div>
                <h2>blogs</h2>

                <Notification message={ notificationMessage } />
                <p>{ user.username } logged in</p>
                <button type="submit" onClick={ handleLogOut }>logout</button>
                
                <h1>Create a new blog</h1>
                <form onSubmit={ handleCreate }>
                    <div>
                        title:
                        <input name="title" type="text" value={ title } onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        author:
                        <input name="author" type="text" value={ author } onChange={({ target }) => setAuthor(target.value)} />
                    </div>
                    <div>
                        url:
                        <input name="url" type="text" value={ url } onChange={({ target }) => setUrl(target.value)} />
                    </div>
                    <button type="submit">Create</button>
                </form>
                {
                    blogs.map(blog => <Blog key={ blog.id } blog={ blog } />)
                }
            </div>
        )
    } 
}

export default App