import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogView = () => {
    const blogs = useSelector(state => state.blogs)
    const blogId = useParams().id
    const blog = blogs.find(blog => blog.id === blogId)

    if (!blog) {
        return (
            <h1>Not Found</h1>
        )
    }

    return (
        <div>
            <h1>{ blog?.title } { blog?.author }</h1>
            <Link to={ blog?.url }>{ blog?.url }</Link>
            <p>{ blog?.likes } likes <button type="button">like</button></p>
            <p>added by { blog?.user?.name }</p>
        </div>
    )
}

export default BlogView