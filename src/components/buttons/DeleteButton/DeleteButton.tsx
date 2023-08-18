import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const DeleteButton: React.FC<Props> = (props) => {
  const { children, variant = "danger" } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaTrash size={18} />
    </Button>
  );
};
