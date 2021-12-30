import React from 'react'
import PropTypes from 'prop-types'
import { AiFillClockCircle } from 'react-icons/ai'
import { Button } from 'react-bootstrap'

const CronjobButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            {props.children}
            <AiFillClockCircle size={18} />
        </Button>
    )
}

CronjobButton.propTypes = {
    children: PropTypes.element,
}

export { CronjobButton }
