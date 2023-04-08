import React from 'react';
import { FaTrashRestore } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export type Props = {
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const RestoreButton = (props: Props) => {
  const { disabled, children, onClick } = props;
  return (
    <Button onClick={onClick} disabled={disabled} variant="secondary">
      {children} <FaTrashRestore size={18} />
    </Button>
  );
};
