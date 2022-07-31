import { ColumnDef } from '@tanstack/react-table';

export type MultiSelectOptionsColumns<TData, TValue = unknown> = {
  columns: Array<ColumnDef<TData, TValue>>;
  url: string;
  title?: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  primaryKey: string;
  onExitModalRefresh?: boolean;
  onExitModal?: Function;
};

type ExtendStandardFields = {
  fieldType?:
  | FieldTypes.CHECKBOX
  | FieldTypes.DATE
  | FieldTypes.NUMBER
  | FieldTypes.PASSWORD
  | FieldTypes.TEXTAREA;
  dropdown?: never;
  multiSelectOptions?: never;
  selectOptionsUrl?: never;
};

type ExtendTextField = {
  fieldType?: FieldTypes.TEXT | FieldTypes.PASSWORD;
  dropdown?: boolean;
  multiSelectOptions?: never;
  selectOptionsUrl?: never;
};

type ExtendMultiSelectField = {
  fieldType?: FieldTypes.MULTISELECT;
  dropdown?: never;
  multiSelectOptions: MultiSelectOptionsColumns<any, any>;
  selectOptionsUrl?: never;
};

type ExtendSelectField = {
  dropdown?: never;
  fieldType?: FieldTypes.SELECT;
  selectOptionsUrl: string;
  multiSelectOptions?: never;
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
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
}
