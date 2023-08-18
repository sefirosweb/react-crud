import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Crud, Props } from "../../src/components/forms/Crud";
import { ColumnDefinition, MultiSelectOptionsColumns } from "../../src/types";
import { Product } from "../../test/mockData/Product";
import { FieldTypes } from "../../src/types";

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;

const multiSelectOptionsColumnsValues: MultiSelectOptionsColumns<Product> = {
  primaryKey: "uuid",
  url: "/api/sub_table",
  getDataUrl: "/api/get_options",
  lazyLoad: true,
  onExitModal: () => {
    console.log("Log on exit modal");
  },
  title: "Editing Table Multi Select",
  columns: [
    {
      accessorKey: "uuid",
    },
    {
      accessorKey: "name",
    },
  ],
};

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: "uuid",
    visible: false,
  },
  {
    accessorKey: "ean",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    editable: true,
    enableSorting: true,
  },
  {
    accessorKey: "category_id",
    header: "Cat.",
    cell: (props) => props.row.original.category,
    editable: true,
    fieldType: FieldTypes.SELECT,
    selectOptionsUrl: "/api/get_options",
  },
  {
    header: "Desc",
    titleOnCRUD: "Description",
    accessorKey: "description",
    fieldType: FieldTypes.HTML,
    editable: true,
  },
  {
    accessorKey: "price",
    header: "€",
    editable: true,
    fieldType: FieldTypes.NUMBER,
  },
  {
    id: "category_list",
    header: "Multi Select",
    editable: true,
    fieldType: FieldTypes.MULTISELECT,
    multiSelectOptions: multiSelectOptionsColumnsValues,
  },
  {
    header: "Created",
    accessorKey: "created_at",
    enableSorting: true,
    cell: (props) => {
      const d = new Date(props.getValue() as string);
      return d.toLocaleString();
    },
  },
];

export const CRUD: Story = {
  args: {
    columns: columns,
    enableGlobalFilter: true,
    canRefresh: true,
    crudUrl: `/api/crud`,
    canDelete: true,
    canEdit: true,
    primaryKey: "uuid",
    createButtonTitle: "Create a new record",
    titleOnDelete: "name",
  },
}

