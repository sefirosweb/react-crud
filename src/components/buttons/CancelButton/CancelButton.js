import React from 'react'
import { GiCancel } from 'react-icons/gi'
import { Button } from 'react-bootstrap'

export const CancelButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            <GiCancel size={22} />
        </Button>
    )
}
