import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
    const [toggle, setToggle] = useState(false)
    const [like, setLike] = useState(blog.likes)

    const handleClick = () => { setToggle(!toggle) }

    const addLike = async () => {
        setLike(blog.likes+=1)
        const updatedContent = {
            'user': blog.user.id,
            'likes': blog.likes,
            'author': blog.author,
            'title': blog.title,
            'url': blog.url
        }
        await blogService.update(updatedContent, blog.id)
    }

    const removeBlog = async () => {
        window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        await blogService.remove(blog.id)
        handleDelete(blog)
    }

    const bgBlue = { backgroundColor: 'blue', color: 'white' }
    const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

    return (
        <div style={ blogStyle }>
            <p>{ blog.title } { blog.author } </p>
            <button id="viewDetail" onClick={ handleClick }>{ toggle ? 'hide' : 'view' }</button>
            {
                toggle
                    ? <div className="d-none">
                        <p>{ blog.url }</p>
                        <p>likes { like } <button id="addLike" onClick={ addLike }>like</button></p>
                        <p>{ blog.user.name }</p>
                        {
                            user.username === blog.user.username
                                ? <button id="deleteBlog" type="button" role="button" style={ bgBlue } onClick={ removeBlog }>remove</button>
                                : ''
                        }
                    </div>
                    : ''
            }
        </div>
    )
}

export default Blog