import React from "react";
import { FormTypeText } from "./FormTypeText";
import { FormTypeCheckbox } from "./FormTypeCheckbox";
import { FormTypeTextArea } from "./FormTypeTextArea";
import { FormTypeSelect } from "./FormTypeSelect";
import { FormTypeNumber } from "./FormTypeNumber";
import { FormTypeDate } from "./FormTypeDate";
import { FormTypePassword } from "./FormTypePassword";
import { FieldTypes, SelectOption } from "../../../types";
import { FormTypeHtml } from "./FormTypeHtml";

type ValidFieldTypes = Exclude<FieldTypes, FieldTypes.MULTISELECT>;

type PropsParams = {
  text: {
    value?: string;
    options?: never;
    selectOptionsUrl?: never;
  };
  html: {
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

export type Props<Field extends ValidFieldTypes = ValidFieldTypes> = {
  [field in Field]: {
    type: field;
    name: string;
    controlId: string;
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
        name={props.name}
        controlId={props.controlId}
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
        name={props.name}
        controlId={props.controlId}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );
  if (hasField(props, FieldTypes.HTML))
    return (
      <FormTypeHtml
        className={props.className}
        label={props.label}
        setValue={(value) => {
          props.handleChange({
            target: {
              name: props.name,
              value
            }
          })
        }}
        options={{
          readOnly: props.isLoading
        }}
        value={props.value}
      />
    );

  if (hasField(props, FieldTypes.CHECKBOX))
    return (
      <FormTypeCheckbox
        name={props.name}
        controlId={props.controlId}
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
        name={props.name}
        controlId={props.controlId}
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
        name={props.name}
        controlId={props.controlId}
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
        name={props.name}
        controlId={props.controlId}
        className={props.className}
        label={props.label}
        isLoading={props.isLoading}
        handleChange={props.handleChange}
        value={props.value}
      />
    );

  return (
    <FormTypeText
      name={props.name}
      controlId={props.controlId}
      className={props.className}
      label={props.label}
      isLoading={props.isLoading}
      handleChange={props.handleChange}
      value={props.value}
    />
  );
};
