import React from 'react'
import { HiOutlineRefresh } from 'react-icons/hi'
import { Button } from 'react-bootstrap'

export const RefreshButton = (props) => {
    return (
        <Button {...props} variant="secondary">
            <HiOutlineRefresh />
        </Button>
    )
}
