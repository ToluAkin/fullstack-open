import { Link, useParams } from 'react-router-dom'
import helper from '../utils/blogListHelper'

const User = ({ users }) => {
    const userId =  useParams().id
    const user = users.find(user => user.id === userId)

    if (!user) {
        return (
            <h1>User</h1>
        )
    }

    return (
        <div>
            <h1>{ user?.name }</h1>
            <p>added blogs</p>
            <ul>
                {
                    user?.blogs.map((blog, i) => (
                        <li key={i}><Link style={ helper.linkStyle } to={`/blogs/${ blog.id }`}>{ blog.title }</Link></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default User