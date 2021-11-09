import { Link, useParams } from 'react-router-dom'
import helper from '../utils/blogListHelper'
import { List, ListItem } from '@mui/material'

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
            <p>Added blogs</p>
            <List>
                {
                    user?.blogs.map((blog, i) => (
                        <ListItem key={i}>
                            <Link style={ helper.linkStyle } to={`/blogs/${ blog.id }`}>{ blog.title }</Link>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default User