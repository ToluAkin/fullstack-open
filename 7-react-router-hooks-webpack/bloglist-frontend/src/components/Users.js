import helper from '../utils/blogListHelper'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material'

const Users = ({ users }) => {
    return (
        <TableContainer component={ Paper }>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Users</TableCell>
                        <TableCell>blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, i) => (
                            <tr key={i}>
                                <td><Link href={ `/users/${ user.id }` }>{ user.name }</Link></td>
                                <td>{ user.blogs.length }</td>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Users