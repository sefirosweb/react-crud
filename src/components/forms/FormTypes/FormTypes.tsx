import React from 'react';
import { FormTypeText } from './FormTypeText';
import { FormTypeCheckbox } from './FormTypeCheckbox';
import { FormTypeTextArea } from './FormTypeTextArea';
import { FormTypeSelect } from './FormTypeSelect';
import { FormTypeNumber } from './FormTypeNumber';
import { FormTypeDate } from './FormTypeDate';
import { FormTypePassword } from './FormTypePassword';
import { FieldTypes } from '../../../types';

export type Props = {
  type?: FieldTypes;
  inputFieldName: string;
  className?: string;
  label?: string;
  isLoading?: boolean;
  handleChange: any;
  value?: any;
  selectOptionsUrl?: string;
};

export const FormTypes = (props: Props): JSX.Element => {
  const {
    type = 'text',
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    selectOptionsUrl,
    className,
  } = props;

  if (type === FieldTypes.SELECT)
    return (
      <FormTypeSelect
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
        selectOptionsUrl={selectOptionsUrl}
      />
    );

  if (type === FieldTypes.TEXTAREA)
    return (
      <FormTypeTextArea
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
      />
    );

  if (type === FieldTypes.CHECKBOX) {
    return (
      <FormTypeCheckbox
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
      />
    );
  }

  if (type === FieldTypes.NUMBER)
    return (
      <FormTypeNumber
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
      />
    );

  if (type === FieldTypes.DATE)
    return (
      <FormTypeDate
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
      />
    );

  if (type === FieldTypes.PASSWORD)
    return (
      <FormTypePassword
        inputFieldName={inputFieldName}
        className={className}
        label={label}
        isLoading={isLoading}
        handleChange={handleChange}
        value={value}
      />
    );

  return (
    <FormTypeText
      inputFieldName={inputFieldName}
      className={className}
      label={label}
      isLoading={isLoading}
      handleChange={handleChange}
      value={value}
    />
  );
};
