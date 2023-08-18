import { MultiSelectCrudTable } from "../../src/components/forms/MultiSelectCrudTable";
import { Product } from "../../test/mockData/Product";
import { ColumnDefinition } from "../../src/types";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Form/MultiSelectCrudTable',
  component: MultiSelectCrudTable,
};

export default meta;

type Story = StoryObj<typeof MultiSelectCrudTable>;

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

export const Template: Story = {
  args: {
    primaryKey: "uuid",
    primaryKeyId: "1",
    crudUrl: "",
    autoSave: true,
    getDataUrl: "/api/get_options",
    columns: TestColumnsModel,
  },
}