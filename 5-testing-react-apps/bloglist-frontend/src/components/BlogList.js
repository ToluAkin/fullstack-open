import React from 'react'

import Blog from './Blog'

const BlogList = ({ blogs, user, handleDelete }) => {
    return (
        blogs.map(blog => <Blog key={ blog.id } blog={ blog }  user={ user } handleDelete={ handleDelete } />)
    )
}

export default BlogList