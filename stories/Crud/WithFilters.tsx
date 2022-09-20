import React, { useRef, useState } from "react";
import { Story } from "@storybook/react";

import { Crud, Props, PropsRef } from "../../src/components/forms/Crud";
import { ColumnDefinition, FieldTypes } from "../../src/types";
import { Product, data } from "../../models/Product";
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";
import { FormTypeSelect } from "../../src/components/forms/FormTypes/FormTypeSelect";
import { useEffect } from "@storybook/addons";

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: "uuid",
    enableColumnFilter: true,
    enableSorting: true,
    dropdown: true,
  },
  {
    accessorKey: "ean",
  },
  {
    accessorKey: "name",
    header: "Edad",
  },
  {
    accessorKey: "description",
    header: "Desc.",
    enableColumnFilter: true,
  },
  {
    accessorKey: "price",
    enableColumnFilter: true,
  },
  {
    accessorKey: "category_id",
    header: "Cat.",
    cell: (props) => props.row.original.category,
    enableColumnFilter: true,
    fieldType: FieldTypes.SELECT,
    selectOptionsUrl: "/api/get_options",
    visible: false
  },
];

const Template = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    const updateData: ColumnFilter = {
      id: "category_id", // must be exist key
      value: e.target.value,
    };
    const upd: ColumnFiltersState = [updateData];
    if (crudRef.current?.table) {
      crudRef.current?.table.setColumnFilters(upd);
    }
  };

  const customButtons = (
    <>
      <FormTypeSelect
        handleChange={handleChange}
        inputFieldName={"Test change"}
        selectOptionsUrl={"/api/get_options"}
        value={selectedValue}
        label={"This is a external filter"}
      />
    </>
  );
  const crudRef = useRef<PropsRef>(null);

  return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
};

export const WithFilters: Story<Props> = Template.bind({});
WithFilters.args = {
  columns: columns,
  data: data,
  enableGlobalFilter: true,
};
