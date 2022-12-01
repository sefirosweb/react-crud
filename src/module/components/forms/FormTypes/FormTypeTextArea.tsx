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
  rows?: number;
};

export const FormTypeTextArea = (props: Props) => {
  const {
    name,
    controlId,
    isLoading,
    label,
    value,
    handleChange,
    className,
    rows = 4,
  } = props;
  return (
    <Form.Group controlId={controlId} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <Form.Control
        as="textarea"
        rows={rows}
        value={value}
        onChange={handleChange}
        name={name}
        readOnly={isLoading}
      />
    </Form.Group>
  );
};
