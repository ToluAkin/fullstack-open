import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import AddBlog from './AddBlog'
import { Grid } from '@mui/material'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <>
            <AddBlog />
            <Grid container spacing={2}>
                { blogs.map(blog => ( <Blog key={ blog.id } blog={ blog }/> )) }
            </Grid>
        </>
    )
}

export default BlogList