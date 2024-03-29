import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Crud, Props, PropsRef } from "../../src/components/forms/Crud";
import { ColumnDefinition, FieldTypes } from "../../src/types";
import { Product, data } from "../../test/mockData/Product";
import { ColumnFilter, ColumnFiltersState } from "@tanstack/react-table";
import { FormTypeSelect } from "../../src/components/forms/FormTypes/FormTypeSelect";
import { useEffect } from "@storybook/addons";
import { DateTime } from 'luxon'

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;

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
    fieldType: FieldTypes.NUMBER
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
  {
    header: "Date",
    accessorFn: (props) => DateTime.fromISO(props.created_at).toMillis(),
    enableColumnFilter: true,
    enableSorting: true,
    fieldType: FieldTypes.DATE,
    cell: (props) => (DateTime.fromISO(props.row.original.created_at)).toISODate() + ' => ' + (DateTime.fromISO(props.row.original.created_at)).toMillis(),
  }
];

export const WithFilters: Story = {
  args: {
    columns: columns,
    data: data,
    enableGlobalFilter: true,
  },
  render: (props) => {
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
          controlId="Test change"
          name="Test change"
          selectOptionsUrl={"/api/get_options"}
          value={selectedValue}
          label={"This is a external filter"}
        />
      </>
    );
    const crudRef = useRef<PropsRef>(null);

    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  },
}

