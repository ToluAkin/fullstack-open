import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        dispatch({ type: 'INIT_BLOGS', data: blogs })
    }
}

export const createBlog = newObject => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch({ type: 'CREATE_BLOG', data: newBlog })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const updatedBlog = { ...blog, likes: blog.likes += 1 }
        await blogService.update(updatedBlog, blog.id)
        dispatch({ type:'LIKE_BLOG', data: updatedBlog })
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({ type: 'DELETE_BLOG', data: blog })
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return state.concat(action.data)
        case 'LIKE_BLOG':
            const updatedBlog = action.data
            return state.map(otherBlog =>
                otherBlog.id !== updatedBlog.id ? otherBlog : updatedBlog
            )
        case 'DELETE_BLOG':
            return state.filter(theBlog => theBlog.id !== action.data.id)
        default: return state
    }
}

export default reducer