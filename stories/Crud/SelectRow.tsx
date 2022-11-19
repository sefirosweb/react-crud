import React from "react";
import { Story } from "@storybook/react";

import { Crud, Props, PropsRef } from "../../src/module/components/forms/Crud";
import { ColumnDefinition } from "../../src/module/types";
import { Product, data } from "../../models/Product";
import { Button } from "react-bootstrap";
import { useRef } from "@storybook/addons";

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
  const handleClick = () => {
    const eans = crudRef.current.getSelectedRows<Product>().map((o) => o.ean);
  };

  const customButtons = (
    <>
      <Button onClick={handleClick}>Show selected row data</Button>
    </>
  );
  const crudRef = useRef<PropsRef>(null);

  return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
};

export const SelectRow: Story<Props> = Template.bind({});
SelectRow.args = {
  columns: columns,
  data: data,
  canSelectRow: true,
};
