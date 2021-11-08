import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import AddBlog from './AddBlog'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <>
            <AddBlog />
            { blogs.map(blog => <Blog key={ blog.id } blog={ blog } />) }
        </>
    )
}

export default BlogList