import React, { useRef } from "react";
import { Story } from "@storybook/react";
import { Crud, Props, PropsRef } from "../../react_components/src/components/forms/Crud";
import { ColumnDefinition } from "../../react_components/src/types";
import { Product, data } from "../../models/Product";
import { Button } from "react-bootstrap";

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

const Template = (props: Props) => {
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
};

export const SelectRow: Story<Props> = Template.bind({});
SelectRow.args = {
  columns: columns,
  data: data,
  canSelectRow: true,
};
