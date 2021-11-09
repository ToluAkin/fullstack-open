import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog } from '../reducers/blogsReducer'
import { Card, CardContent, Grid, Link, Typography } from '@mui/material'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const removeBlog = async () => {
        window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)
        dispatch(deleteBlog(blog))
    }

    return (
        <Grid item xs md={4} lg={3}>
            <Link href={`/blogs/${ blog.id }`} underline="none">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom>
                            { blog.title } by { blog.author }
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}

export default Blog