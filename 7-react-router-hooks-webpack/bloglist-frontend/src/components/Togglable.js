import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    Togglable.displayName = 'Togglable'

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => { return { toggleVisibility } })

    return (
        <div>
            <div style={ hideWhenVisible }>
                <Button variant='contained' onClick={ toggleVisibility }>{ props.buttonLabel }</Button>
                <p />
            </div>
            <div style={ showWhenVisible }>
                { props.children }
                <Button variant='contained' onClick={ toggleVisibility }>cancel</Button>
                <p />
            </div>
        </div>
    )
})

export default Togglable