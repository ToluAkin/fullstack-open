import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    Togglable.displayName = 'Togglable'

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {return { toggleVisibility } })

    return (
        <div>
            <div style={ hideWhenVisible }>
                <button onClick={ toggleVisibility }>{ props.buttonLabel }</button>
                <p />
            </div>
            <div style={ showWhenVisible }>
                { props.children }
                <button onClick={ toggleVisibility }>cancel</button>
                <p />
            </div>
        </div>
    )
})

export default Togglable