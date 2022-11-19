import React from "react";
import { FormTypeText } from "./FormTypeText";
import { FormTypeCheckbox } from "./FormTypeCheckbox";
import { FormTypeTextArea } from "./FormTypeTextArea";
import { FormTypeSelect } from "./FormTypeSelect";
import { FormTypeNumber } from "./FormTypeNumber";
import { FormTypeDate } from "./FormTypeDate";
import { FormTypePassword } from "./FormTypePassword";
import { FieldTypes, SelectOption } from "../../../types";

type ValidFieldTypes = Exclude<FieldTypes, FieldTypes.MULTISELECT>;

type PropsParams = {
  text: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  number: {
    value?: string | number;
    options?: never;
    selectOptionsUrl?: never;
  };
  date: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  textarea: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  password: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  checkbox: {
    value?: string | boolean | number;
    options?: never;
    selectOptionsUrl?: never;
  };
  multiselect: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  select: {
    value?: string | number | SelectOption;
    options?: SelectOption[] | string[];
    selectOptionsUrl?: string;
  };
};

type Props<Field extends ValidFieldTypes = ValidFieldTypes> = {
  [field in Field]: {
    type: field;
    inputFieldName: string;
    className?: string;
    label?: string;
    isLoading?: boolean;
    handleChange?: any;
  } & PropsParams[field];
}[Field];

function hasField<F extends FieldTypes>(
  props: Props,
  type: F
): props is Props<Extract<ValidFieldTypes, F>> {
  return props.type === type;
}

export const FormTypes = (props: Props): JSX.Element => {
  if (hasField(props, FieldTypes.SELECT))
    return (
      <FormTypeSelect
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
        selectOptionsUrl={props.selectOptionsUrl}
      />
    );

  if (hasField(props, FieldTypes.TEXTAREA))
    return (
      <FormTypeTextArea
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  if (hasField(props, FieldTypes.CHECKBOX))
    return (
      <FormTypeCheckbox
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  if (hasField(props, FieldTypes.NUMBER))
    return (
      <FormTypeNumber
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  if (hasField(props, FieldTypes.DATE))
    return (
      <FormTypeDate
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  if (hasField(props, FieldTypes.PASSWORD))
    return (
      <FormTypePassword
        inputFieldName={props.inputFieldName}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  return (
    <FormTypeText
      inputFieldName={props.inputFieldName}
      className={props.className}
      label={props.label}
      isLoading={props.isLoading}
      handleChange={props.handleChange}
      value={props.value}
    />
  );
};
