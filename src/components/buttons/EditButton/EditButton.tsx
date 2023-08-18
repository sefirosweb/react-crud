import React from 'react';
import { FaPen } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const EditButton: React.FC<Props> = (props) => {
  const { children, variant = 'secondary' } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaPen size={18} />
    </Button>
  );
};
