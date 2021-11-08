import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import helper from '../utils/blogListHelper'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [toggle, setToggle] = useState(false)

    const handleClick = () => { setToggle(!toggle) }

    const addLike = () => { dispatch(likeBlog(blog)) }
    const removeBlog = async () => {
        window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)
        dispatch(deleteBlog(blog))
    }

    const bgBlue = { backgroundColor: 'blue', color: 'white' }
    const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

    return (
        <article id="blog" style={ blogStyle }>
            <p>
                <Link style={ helper.linkStyle } to={`/blogs/${ blog.id }`}>{ blog.title } { blog.author }</Link>
            </p>
            <button id="viewDetail" onClick={ handleClick }>{ toggle ? 'hide' : 'view' }</button>
            {
                toggle
                    ? <div className="d-none">
                        <p>{ blog.url }</p>
                        <div>
                            <p id="likes">likes { blog.likes }</p>
                            <button id="addLike" onClick={ addLike }>like</button>
                        </div>
                        <p>{ blog.user.name }</p>
                        {
                            user.username === blog.user.username
                            && <button id="deleteBlog" type="button" style={ bgBlue } onClick={ removeBlog }>remove</button>
                        }
                    </div>
                    : ''
            }
        </article>
    )
}

export default Blog