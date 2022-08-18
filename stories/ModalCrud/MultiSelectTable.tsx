import React from "react";

import { Story } from "@storybook/react";
import {
  MultiSelectCrudTable,
  Props,
} from "../../src/components/forms/MultiSelectCrudTable";
import { Product } from "../../models/Product";
import { ColumnDefinition } from "../../src/types";

const TestColumnsModel: ColumnDefinition<Product>[] = [
  {
    accessorKey: "uuid",
    enableHiding: true,
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "category",
  },
];

const Template = (props: Props) => {
  const { primaryKey, primaryKeyId, crudUrl, columns, getDataUrl } = props;

  return (
    <>
      <MultiSelectCrudTable
        columns={columns}
        crudUrl={crudUrl}
        primaryKey={primaryKey}
        primaryKeyId={primaryKeyId}
        getDataUrl={getDataUrl}
      />
    </>
  );
};

export const MultiSelectTable: Story<Props> = Template.bind({});
MultiSelectTable.args = {
  primaryKey: "uuid",
  primaryKeyId: "1",
  crudUrl: "/api/sub_table",
  getDataUrl: "/api/sub_table/get_array",
  columns: TestColumnsModel,
};
