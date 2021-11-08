import { Link } from 'react-router-dom'
import helper from '../utils/blogListHelper'

const Users = ({ users }) => {
    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => (
                            <tr key={i}>
                                <td><Link style={ helper.linkStyle } to={ `/users/${ user.id }` }>{ user.name }</Link></td>
                                <td>{ user.blogs.length }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Users