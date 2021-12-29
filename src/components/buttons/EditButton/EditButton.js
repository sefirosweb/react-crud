import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { Button } from 'react-bootstrap'

export const EditButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            {props.children}
            <AiFillEdit />
        </Button>
    )
}
