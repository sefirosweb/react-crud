import { createData } from "../.storybook/dataMock";
import { ColumnDefinition } from "../src/module/types";
import { FieldTypes } from "../src/module/types";

export type Product = {
  uuid: string;
  ean: number;
  name: string;
  description: string;
  price: number;
  category: string;
  category_id: string;
  created_at: string;
  category_list: string;
};

export const data: Product[] = createData().splice(0, 6);

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
    accessorKey: "id",
  },
  {
    titleOnCRUD: "Item Type",
    accessorKey: "name",
    editable: true,
  },
  {
    titleOnCRUD: "API KEY",
    accessorKey: "api_key",
    fieldType: FieldTypes.PASSWORD,
    editable: true,
  },
  {
    titleOnCRUD: "Insert number",
    accessorKey: "number_type_field",
    fieldType: FieldTypes.NUMBER,
    editable: true,
  },
  {
    titleOnCRUD: "Insert Date",
    accessorKey: "number_type_date",
    fieldType: FieldTypes.DATE,
    editable: true,
  },
  {
    titleOnCRUD: "Select option",
    accessorKey: "input_select_option",
    fieldType: FieldTypes.SELECT,
    editable: true,
    selectOptionsUrl: "/api/get_options",
  },
  {
    titleOnCRUD: "Boolean option",
    accessorKey: "input_check_option",
    fieldType: FieldTypes.CHECKBOX,
    editable: true,
  },
  {
    titleOnCRUD: "Text area",
    accessorKey: "input_text_area",
    fieldType: FieldTypes.TEXTAREA,
    editable: true,
  },
];
