import React from 'react'

import Notification from '../components/Notification'
import { Box, Button, Paper, TextField } from '@mui/material'

const LoginForm = ({ handleLogin, handleNameChange, username, handlePasswordChange, password }) => {

    return (
        <Paper sx={{ padding: 2 }}>
            <h1>Login to application</h1>
            <Notification />
            <Box component="form" onSubmit={ handleLogin } noValidate
                 sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1, width: '25ch' } }}>
                    <TextField label="Username" id="username" type="text" value={ username }
                        onChange={ handleNameChange } />
                    <TextField label="Password" id="pswd" type="password" value={ password }
                        onChange={ handlePasswordChange } />
                <Button variant='contained' type="submit">login</Button>
            </Box>
        </Paper>
    )
}

export default LoginForm