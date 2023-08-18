import React from 'react';
import { FaTrashRestore } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const RestoreButton: React.FC<Props> = (props) => {
  const { children, variant = "secondary" } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaTrashRestore size={18} />
    </Button>
  );
};
