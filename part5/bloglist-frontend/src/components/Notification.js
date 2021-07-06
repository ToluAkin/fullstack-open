import React from 'react'

const Notification = ({ message }) => {
    if (message === null) return null
    let displayedMessage;
    if (message) displayedMessage = <p className={ message.includes('added') ? 'success' : 'error' }>{message}</p>
    
    return (
        <div>{displayedMessage}</div>
    )
}

export default Notification