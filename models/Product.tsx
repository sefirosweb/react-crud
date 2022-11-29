import { createData } from "../src/dataMock";
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

export const data: Product[] = createData()

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

const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();

const fullDatetoday = yyyy + "-" + mm + "-" + dd;

export const TestColumnsModel: Array<ColumnDefinition<TestModel>> = [
  {
    accessorKey: "id",
    data: "5"
  },
  {
    titleOnCRUD: "Item Type",
    accessorKey: "name",
    editable: true,
    data: "Core I7 10º gen"
  },
  {
    titleOnCRUD: "API KEY",
    accessorKey: "api_key",
    fieldType: FieldTypes.PASSWORD,
    editable: true,
    data: "·$ADADFTWSEGF%G%Gg45",
  },
  {
    titleOnCRUD: "Insert number",
    accessorKey: "number_type_field",
    fieldType: FieldTypes.NUMBER,
    editable: true,
    data: "4412",
  },
  {
    titleOnCRUD: "Insert Date",
    accessorKey: "number_type_date",
    fieldType: FieldTypes.DATE,
    editable: true,
    data: fullDatetoday
  },
  {
    titleOnCRUD: "Select option",
    accessorKey: "input_select_option",
    fieldType: FieldTypes.SELECT,
    editable: true,
    selectOptionsUrl: "/api/get_options",
    data: "1"
  },
  {
    titleOnCRUD: "Boolean option",
    accessorKey: "input_check_option",
    fieldType: FieldTypes.CHECKBOX,
    editable: true,
    data: "true",
  },
  {
    titleOnCRUD: "Text area",
    accessorKey: "input_text_area",
    fieldType: FieldTypes.TEXTAREA,
    editable: true,
    data: "This is a text area",
  },
];
