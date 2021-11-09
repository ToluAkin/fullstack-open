import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, addComment } from '../reducers/blogsReducer'

import { Box, Button, Link, List, ListItem, Paper, TextField, Typography } from '@mui/material'

const BlogView = ({ users }) => {
    const [comment, setComment] = useState('')
    const blogs = useSelector(state => state.blogs)
    const blogId = useParams().id
    const blog = blogs.find(blog => blog.id === blogId)
    const user = users.find(user => user.id === blog?.user || blog?.user?.id)

    const dispatch = useDispatch()
    const addLike = () => { dispatch(likeBlog(blog)) }

    const addBlogComment = async e => {
        e.preventDefault()
        dispatch(addComment({ ...blog, comments: comment }))
        setComment('')
    }

    if (!blog) {
        return (
            <h2>Not Found</h2>
        )
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4">{ blog?.title }</Typography><Typography variant="caption"> by { blog?.author } </Typography>
            <Typography><Link href={ blog?.url }>{ blog?.url }</Link></Typography>
            <span>
                <Typography>{ blog?.likes } likes </Typography>
                <span>
                    <Button variant='contained' onClick={ addLike }>like
                        <span className="material-icons-round">thumb_up</span>
                    </Button>
                </span>
            </span>
            <p>added by { user?.name }</p>
            <h3>Comments</h3>

            <Box component="form" autoComplete="off" onSubmit={ addBlogComment } noValidate
                 sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', alignItems: 'center' }}
            >
                <TextField label="Comment" id="comment" variant="filled" value={ comment } onChange={ ({ target }) => setComment(target.value) } />
                <Button type="submit" variant='contained'>add comment</Button>
            </Box>

            <List dense>
                {
                    blog?.comments?.map((blogComment, i) => (
                        <ListItem key={i}>{ blogComment }</ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}

export default BlogView