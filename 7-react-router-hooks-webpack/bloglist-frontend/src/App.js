import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//components
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

//services
import blogService from './services/blogs'
import loginService from './services/login'

//reducers
import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { signedInUser, signOut } from './reducers/usersReducer'
import Users from "./components/Users";
import User from "./components/User";
import usersService from "./services/users";
import BlogView from "./components/BlogView";

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => { dispatch((initializeBlogs())) }, [dispatch])
    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            dispatch(signedInUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        (async() => {
            const allUsers = await usersService.getAll()
            setUsers(allUsers)
        })()
    }, [])

    const handleLogin = async e => {
        e.preventDefault()
        const userAuth = { 'username' : username.toLowerCase(), password }
        try {
            const user = await loginService.login(userAuth)
            dispatch(signedInUser(user))
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            dispatch(setNotification('wrong username or password'))
        }
    }

    const handleLogOut = e => {
        e.preventDefault()
        window.localStorage.clear()
        dispatch(signOut())
    }

    if (user === null) {
        return (
            <LoginForm
                handleLogin={ handleLogin }
                handleNameChange={ ({ target }) => setUsername(target.value) }
                username={ username }
                handlePasswordChange={ ({ target }) => setPassword(target.value) }
                password={ password }
            />
        )
    } else {
        return (
            <BrowserRouter>
                <section>
                    <h2>Blogs</h2>
                    <Notification/>
                    <p>{ user.name } logged in</p>
                    <button type="submit" onClick={ handleLogOut }>logout</button>
                    <p/>
                    <Switch>
                        <Route exact path='/' component={ BlogList } />
                        <Route path='/users/:id'>
                            <User users={ users } />
                        </Route>
                        <Route path='/users'>
                            <Users users={ users } />
                        </Route>
                        <Route path='/blogs/:id'>
                            <BlogView />
                        </Route>
                    </Switch>
                </section>
            </BrowserRouter>
        )
    }
}

export default App