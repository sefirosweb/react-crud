import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const CancelButton = (props: Props) => {
  const { children, variant = "secondary" } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaTimesCircle size={18} />
    </Button>
  );
};
