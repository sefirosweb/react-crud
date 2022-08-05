import React from 'react';
import { Form } from 'react-bootstrap';

export type Props = {
  inputFieldName: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  rows?: number;
};

export const FormTypeTextArea = (props: Props) => {
  const {
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    className,
    rows = 4,
  } = props;
  return (
    <Form.Group controlId={inputFieldName} className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <Form.Control
        as="textarea"
        rows={rows}
        value={value}
        onChange={handleChange}
        name={inputFieldName}
        readOnly={isLoading}
      />
    </Form.Group>
  );
};
