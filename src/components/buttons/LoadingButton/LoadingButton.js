import React from 'react';
import { Button } from "react-bootstrap";
import { LoadingSpinner } from "./../../icons/LoadingSpinner";

export const LoadingButton = (props) => {
    return (
        <Button {...props} variant="primary" disabled>
            <LoadingSpinner />
        </Button>
    );
};


