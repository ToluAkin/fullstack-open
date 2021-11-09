import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle, Stack } from '@mui/material'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification) return null

    return (
        <Stack>
            {
                notification?.includes('added')
                ? <Alert variant="outlined" severity="success">
                    <AlertTitle>Success</AlertTitle>
                        { notification }
                 </Alert>
                : <Alert variant="outlined" severity="error">
                    <AlertTitle>Error</AlertTitle>
                        { notification }
                 </Alert>
            }
        </Stack>
    )
}

export default Notification