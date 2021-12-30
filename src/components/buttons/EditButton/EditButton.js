import React from 'react'
import PropTypes from 'prop-types'
import { AiFillEdit } from 'react-icons/ai'
import { Button } from 'react-bootstrap'

const EditButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            {props.children}
            <AiFillEdit />
        </Button>
    )
}

EditButton.propTypes = {
    children: PropTypes.element,
}

export { EditButton }
