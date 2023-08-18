import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Crud, Props, PropsRef } from "../../src/components/forms/Crud";
import { ColumnDefinition } from "../../src/types";
import { Product, data } from "../../test/mockData/Product";
import { Button } from "react-bootstrap";

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;

const columns: ColumnDefinition<Product>[] = [
  {
    accessorKey: "uuid",
    enableColumnFilter: true,
  },
  {
    accessorKey: "ean",
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "description",
    header: "Desc.",
  },
  {
    accessorKey: "price",
    header: "€",
  },
  {
    accessorKey: "category",
    header: "Cat.",
  },
];

export const SelectRow: Story = {
  args: {
    columns: columns,
    data: data,
    canSelectRow: true,
  },
  render: (props) => {
    const crudRef = useRef<PropsRef>(null);
    const handleClick = () => {
      const eans = crudRef.current?.getSelectedRows<Product>().map((o) => o.ean);
      console.log({ eans })
    };

    const customButtons = (
      <>
        <Button onClick={handleClick}>Show selected row data</Button>
      </>
    );

    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  },
}
