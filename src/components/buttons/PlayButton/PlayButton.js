import React from 'react'
import PropTypes from 'prop-types'
import { FiPlay } from 'react-icons/fi'
import { Button } from 'react-bootstrap'

const PlayButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            {props.children}
            <FiPlay size={16} />
        </Button>
    )
}

PlayButton.propTypes = {
    children: PropTypes.element,
}

export { PlayButton }
