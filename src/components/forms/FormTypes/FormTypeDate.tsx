import React from 'react';
import { Form } from 'react-bootstrap';

export type Props = {
  name: string;
  controlId: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

export const FormTypeDate = (props: Props) => {
  const { name, controlId, isLoading, label, value, handleChange, className } =
    props;
  return (
    <Form.Group controlId={controlId} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <Form.Control
        type="date"
        readOnly={isLoading}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </Form.Group>
  );
};
