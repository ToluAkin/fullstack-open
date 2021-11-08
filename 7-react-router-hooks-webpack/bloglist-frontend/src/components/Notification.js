import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) return null
    let displayedMessage
    if (notification) displayedMessage = <p className={ notification.includes('added') ? 'success' : 'error' }>{ notification }</p>

    return (
        <div>{ displayedMessage }</div>
    )
}

export default Notification