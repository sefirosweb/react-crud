import { ColumnDefinition } from '../src/types';
import { FieldTypes } from '../src/types/FieldTypes';

export type Product = {
  uuid: string;
  ean: number;
  name: string;
  description: string;
  price: number;
  category: string;
  category_id: string;
};

export const data: Product[] = [
  {
    uuid: 'asdas123',
    ean: 843783843848,
    name: 'Product A',
    description: 'Description product A',
    price: 75.99,
    category: 'Category Type A',
    category_id: '1',
  },
  {
    uuid: '42da324',
    ean: 8004684684,
    name: 'Product B',
    description: 'Description product A',
    price: 24.0,
    category: 'Category Type A',
    category_id: '1',
  },
  {
    uuid: '54g46',
    ean: 847884086,
    name: 'Product C',
    description: 'Description product C',
    price: 14.99,
    category: 'Category Type C',
    category_id: '2',
  },
];

export type TestModel = {
  id: string;
  name: string;
  api_key: string;
  number_type_field: string;
  number_type_date: string;
  input_select_option: string;
  input_check_option: string;
  input_text_area: string;
};

export const TestColumnsModel: ColumnDefinition<TestModel>[] = [
  {
    accessorKey: 'id',
  },
  {
    titleOnCRUD: 'Item Type',
    accessorKey: 'name',
    editable: true,
  },
  {
    titleOnCRUD: 'API KEY',
    accessorKey: 'api_key',
    fieldType: FieldTypes.PASSWORD,
    editable: true,
  },
  {
    titleOnCRUD: 'Insert number',
    accessorKey: 'number_type_field',
    fieldType: FieldTypes.NUMBER,
    editable: true,
  },
  {
    titleOnCRUD: 'Insert Date',
    accessorKey: 'number_type_date',
    fieldType: FieldTypes.DATE,
    editable: true,
  },
  {
    titleOnCRUD: 'Select option',
    accessorKey: 'input_select_option',
    fieldType: FieldTypes.SELECT,
    editable: true,
    selectOptionsUrl: '/api/get_options',
  },
  {
    titleOnCRUD: 'Boolean option',
    accessorKey: 'input_check_option',
    fieldType: FieldTypes.CHECKBOX,
    editable: true,
  },
  {
    titleOnCRUD: 'Text area',
    accessorKey: 'input_text_area',
    fieldType: FieldTypes.TEXTAREA,
    editable: true,
  },
];
