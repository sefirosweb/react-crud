import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export type Props = {
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const DeleteButton = (props: Props) => {
  const { disabled, children, onClick } = props;
  return (
    <Button onClick={onClick} disabled={disabled} variant="danger">
      {children} <FaTrash size={18} />
    </Button>
  );
};
