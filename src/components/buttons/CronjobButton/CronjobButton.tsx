import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const CronjobButton: React.FC<Props> = (props) => {
  const { children, variant = "secondary" } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaRegClock size={18} />
    </Button>
  );
};
