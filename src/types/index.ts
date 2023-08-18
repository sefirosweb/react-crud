import React from 'react';
import { CellContext, ColumnDef } from '@tanstack/react-table';

export type MultiSelectOptionsColumns<TData, TValue = unknown> = {
  columns: Array<ColumnDefinition<TData, TValue>>;
  url: string;
  title?: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  primaryKey: keyof TData;
  sentKeyAs?: string,
  onExitModalRefresh?: boolean;
  onExitModal?: () => void;
};

type ExtendStandardFields = {
  fieldType?:
  | FieldTypes.CHECKBOX
  | FieldTypes.DATE
  | FieldTypes.NUMBER
  | FieldTypes.PASSWORD
  | FieldTypes.TEXTAREA
  | FieldTypes.HTML;
  dropdown?: never;
  multiSelectOptions?: never;
  selectOptionsUrl?: never;
  data?: string | number
};

type ExtendTextField = {
  fieldType?: FieldTypes.TEXT | FieldTypes.PASSWORD;
  dropdown?: boolean;
  multiSelectOptions?: never;
  selectOptionsUrl?: never;
  data?: string | number
};

type ExtendMultiSelectField = {
  fieldType?: FieldTypes.MULTISELECT;
  dropdown?: never;
  multiSelectOptions: MultiSelectOptionsColumns<any, any>;
  selectOptionsUrl?: never;
  data?: Array<string> | Array<number>
};

type ExtendSelectField = {
  dropdown?: never;
  fieldType?: FieldTypes.SELECT;
  selectOptionsUrl: string;
  multiSelectOptions?: never;
  data?: string | number
};

export type ColumnDefinition<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  accessorKey?: Extract<keyof TData, string>;
  editable?: boolean;
  selectOptionsUrl?: string;
  titleOnCRUD?: string;
  visible?: boolean;
  getCellStyle?: (cell: CellContext<TData, TValue>) => React.CSSProperties;
  getCellClass?: (cell: CellContext<TData, TValue>) => string;
} & (
    | ExtendStandardFields
    | ExtendMultiSelectField
    | ExtendSelectField
    | ExtendTextField
  );

export type SelectOption = {
  value: string;
  name: string;
};

export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'danger'
  | 'warning';

export enum FieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  TEXTAREA = 'textarea',
  HTML = 'html',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
}

export type CrudType = "CREATE" | "UPDATE" | "DELETE";

export type DataField = {
  value: string;
  name: string;
} & Record<string, any>;

export type InputFilter = Record<string, unknown>

export type ModalDataToSend = Record<
  string,
  string | number | Array<string> | Array<number>
>