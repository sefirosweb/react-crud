import React from 'react';
import { Button } from 'react-bootstrap';
import { LoadingSpinner } from './../../icons/LoadingSpinner';

export type Props = {};

export const LoadingButton = () => {
  return (
    <Button variant="primary" disabled>
      <LoadingSpinner />
    </Button>
  );
};
