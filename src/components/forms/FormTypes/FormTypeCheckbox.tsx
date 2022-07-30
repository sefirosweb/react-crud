import React from 'react';
import { Form } from 'react-bootstrap';

export type Props = {
  inputFieldName: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: Function;
  value?: any;
};

const parser = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value === '1' || value === 'true';
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return false;
};

export const FormTypeCheckbox = (props: Props) => {
  const { inputFieldName, className, label, isLoading, handleChange, value } =
    props;

  const checked: boolean = parser(value);

  return (
    <Form.Group controlId={inputFieldName} className={className}>
      <Form.Check
        type="switch"
        disabled={isLoading}
        onChange={() => {
          handleChange({
            target: {
              name: inputFieldName,
              value: checked ? '0' : '1',
            },
          });
        }}
        checked={checked}
        label={label}
        name={inputFieldName}
      />
    </Form.Group>
  );
};
