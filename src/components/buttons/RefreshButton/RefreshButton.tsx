import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const RefreshButton: React.FC<Props> = (props) => {
  const { children, variant = "secondary" } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaSyncAlt size={18} />
    </Button>
  );
};
