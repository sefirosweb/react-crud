import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai'
import { Button } from 'react-bootstrap';

export const CronjobButton = (props) => {
    return (
        <Button {...props} variant='secondary'>{props.children}<AiFillClockCircle size={18} /></Button>
    )
}
