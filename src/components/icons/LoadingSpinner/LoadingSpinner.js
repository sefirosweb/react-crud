import React from 'react'
import { Spinner } from 'react-bootstrap'

export const LoadingSpinner = () => {
    return (
        <>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-2"
            />
            <span className="mx-2">Loading...</span>
        </>
    )
}
