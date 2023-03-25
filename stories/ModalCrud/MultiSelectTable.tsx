import React from "react";

import { Story } from "@storybook/react";
import {
  MultiSelectCrudTable,
  Props,
} from "../../react_components/src/components/forms/MultiSelectCrudTable";
import { Product } from "../../models/Product";
import { ColumnDefinition } from "../../react_components/src/types";

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
  getDataUrl: "/api/get_options",
  columns: TestColumnsModel,
};
