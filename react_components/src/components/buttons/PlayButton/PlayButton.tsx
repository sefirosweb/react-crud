import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const PlayButton: React.FC<Props> = (props) => {
  const { children, variant = 'secondary' } = props;
  return (
    <Button {...props} variant={variant}>
      {children} <FaRegPlayCircle size={18} />
    </Button>
  );
};
