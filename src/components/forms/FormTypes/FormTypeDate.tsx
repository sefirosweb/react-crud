import React from 'react';
import { Form } from 'react-bootstrap';

export type Props = {
  inputFieldName: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: any;
};

export const FormTypeDate = (props: Props) => {
  const { inputFieldName, isLoading, label, value, handleChange, className } =
    props;
  return (
    <Form.Group controlId={inputFieldName} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <Form.Control
        type="date"
        readOnly={isLoading}
        name={inputFieldName}
        onChange={handleChange}
        value={value}
      />
    </Form.Group>
  );
};
