import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//components
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

//services
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'

//reducers
import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { signedInUser, signOut } from './reducers/usersReducer'

//style
import { Box, Button, Container, Typography, Link } from '@mui/material'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => { dispatch((initializeBlogs())) }, [dispatch])
    useEffect(() => {
        //save logged in user's data
        const loggedInUser = window.localStorage.getItem('loggedUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            dispatch(signedInUser(user))
            blogService.setToken(user.token)
        }

        //get all user's view
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
                <Container sx={{ paddingTop: 5, paddingBottom: 10 }}>
                    <Box>
                        <h2>Blog App</h2>
                        <Box sx={{ display: 'flex', alignItems: 'center', typography: 'body1', justifyContent: 'flex-end',
                            '& > :not(style) + :not(style)': {
                                mr: 2,
                            }, }}>
                            <Link href="/" underline="always" sx={{ mr: 2, color: 'black' }}>Blogs</Link>
                            <Link href="/users" underline="always" sx={{ color: 'black' }}>Users</Link>
                            <Typography>
                                <strong>{ user.name }</strong> logged in
                            </Typography>
                            <Button variant='contained' onClick={ handleLogOut } type='submit'>logout</Button>
                        </Box>
                    </Box>
                    <Notification/>
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
                            <BlogView users={ users } />
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }
}

export default App