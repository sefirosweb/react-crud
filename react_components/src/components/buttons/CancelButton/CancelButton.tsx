import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export type Props = {
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const CancelButton = (props: Props) => {
  const { disabled, children, onClick } = props;
  return (
    <Button onClick={onClick} disabled={disabled} variant="secondary">
      {children} <FaTimesCircle size={18} />
    </Button>
  );
};
