import React from "react";

import { Story } from "@storybook/react";
import {
  MultiSelectCrudTable,
  Props,
} from "../../src/module/components/forms/MultiSelectCrudTable";
import { Product } from "../../models/Product";
import { ColumnDefinition } from "../../src/module/types";

const TestColumnsModel: ColumnDefinition<Product>[] = [
  {
    accessorKey: "uuid",
  },
  {
    accessorKey: "category",
  },
  {
    accessorKey: "description",
  },
];

const Template = (props: Props) => {
  return (
    <>
      <MultiSelectCrudTable {...props} />
    </>
  );
};

export const MultiSelectTable: Story<Props> = Template.bind({});
MultiSelectTable.args = {
  primaryKey: "uuid",
  primaryKeyId: "1",
  crudUrl: "",
  autoSave: true,
  getDataUrl: "/api/sub_table/get_array",
  columns: TestColumnsModel,
};
