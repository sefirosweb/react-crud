import React, { useEffect, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Crud, Props, PropsRef } from "../../src/components/forms/Crud";
import { ColumnDefinition } from "../../src/types";
import { Product } from "../../test/mockData/Product";
import { FieldTypes } from "../../src/types";
import { FormTypeSelect } from "../../src/components/forms/FormTypes/FormTypeSelect";
import { useState } from "@storybook/addons";
import { FilterLabel } from "@sefirosweb/react-multiple-search";

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;


const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: "uuid",
    header: "UUID",
    enableColumnFilter: true,
    dropdown: true,
    getCellStyle: () => {
      return {
        backgroundColor: "#e0cffc"
      }
    },
  },
  {
    accessorKey: "ean",
    header: "EAN",
    getCellClass: () => {
      return 'bg-success'
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
  },
  {
    accessorKey: "description",
    header: "Desc.",
    enableColumnFilter: true,
  },
  {
    accessorKey: "price",
    header: "€",
    enableColumnFilter: true,
    fieldType: FieldTypes.NUMBER,
  },
  {
    accessorKey: "category_id",
    header: "Cat.",
    cell: (props) => props.row.original.category,
    enableColumnFilter: true,
    fieldType: FieldTypes.SELECT,
    selectOptionsUrl: "/api/get_options",
  },
];


// const enableGlobalFilterLabels: Array<FilterLabel> = columns.map(column => {
//   return {
//     label: column.header,
//     filter: column.accessorKey
//   }
// })

export const ApiLazyLoad: Story = {
  args: {
    columns: columns,
    enableGlobalFilter: true,
    // enableGlobalFilterLabels,
    crudUrl: `/api/crud`,
    lazyLoad: true,
  },
  render: (props) => {
    const [selectedValue, setSelectedValue] = useState("3");
    const crudRef = useRef<PropsRef>(null);

    useEffect(() => {
      const lazyFilter: Record<string, any> = {
        category_id: "3",
      };
      crudRef.current?.setLazyilters(lazyFilter);
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);

      const lazyFilter: Record<string, any> = {
        category_id: e.target.value,
      };

      if (lazyFilter.category_id === "") {
        delete lazyFilter.category_id;
      }

      if (crudRef.current) {
        crudRef.current.setLazyilters(lazyFilter);
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
        />
      </>
    );


    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  },
}

