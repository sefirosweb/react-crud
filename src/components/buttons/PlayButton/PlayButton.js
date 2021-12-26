import React from 'react';
import { FiPlay } from 'react-icons/fi'
import { Button } from 'react-bootstrap';

export const PlayButton = (props) => {
    return (
        <Button {...props} variant='secondary'>{props.children}<FiPlay size={16} /></Button>
    )
}
