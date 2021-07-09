import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

//components
import Blog from './Blog'
import Notification from './Notification'
import Togglable from './Togglable'

//services
import blogService from '../services/blogs'

const AddBlog = ({ user, handleLogOut, blogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    const blogFormRef = useRef()

    const handleCreate = async e => {
        e.preventDefault()
        await blogService.create({ title, author, url })
        setNotificationMessage(`a new blog ${title} by ${author} added`)
        blogFormRef.current.toggleVisibility()
    }


    return (
        <div>
            <h2>blogs</h2>
            <Notification message={ notificationMessage } />
            <p>{ user.username } logged in</p>
            <button type="submit" onClick={ handleLogOut }>logout</button>
            <p />
            <Togglable buttonLabel="create new blog" ref={ blogFormRef } >
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
            </Togglable>
            { blogs.sort((a,b) => b.likes - a.likes).map(blog => <Blog key={ blog.id } blog={ blog } user={ user } />) }
        </div>
    )
}

AddBlog.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogOut: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired
}
export default AddBlog