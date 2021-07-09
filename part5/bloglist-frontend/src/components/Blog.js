import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
    const [toggle, setToggle] = useState(false)

    const handleClick = () => { setToggle(!toggle) }
    const handleAddingLikes = async () => {
        const updatedContent = {
            'user': blog.user.id,
            'likes': blog.likes+=1,
            'author': blog.author,
            'title': blog.title,
            'url': blog.url
        }
        await blogService.update(updatedContent, blog.id)
    }
    const handleDelete = async () => {
        const deleteAction = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (deleteAction) {
            await blogService.remove(blog.id)
        }
    }

    const bgBlue = { backgroundColor: 'blue', color: 'white' }
    const buttonDelete = <button style={ bgBlue } onClick={ handleDelete }>remove</button>

    const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }
    const blogDetail = <div>
        <p>{ blog.url }</p>
        <p>likes { blog.likes } <button onClick={ handleAddingLikes }>like</button></p>
        <p>{ blog.user.name }</p>
        { user && user.username === blog.user.username ? buttonDelete : '' }
    </div>

    return (
        <div style={ blogStyle }>
            <p>
                { blog.title } { blog.author }
                <button onClick={ handleClick }>{ toggle ? 'hide' : 'view' }</button>
            </p>
            { toggle ? blogDetail : '' }
        </div>
    )
}

export default Blog