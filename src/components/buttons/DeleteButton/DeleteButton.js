import React from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { Button } from 'react-bootstrap';

export const DeleteButton = (props) => {
    return (
        <Button {...props} variant='danger'><AiFillDelete /></Button>
    )
}

