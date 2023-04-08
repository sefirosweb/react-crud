import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export type Props = {
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const CronjobButton = (props: Props) => {
  const { disabled, children, onClick } = props;
  return (
    <Button onClick={onClick} disabled={disabled} variant="secondary">
      {children} <FaRegClock size={18} />
    </Button>
  );
};
