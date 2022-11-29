import React, { useRef } from "react";
import { Story } from "@storybook/react";

import { Crud, Props, PropsRef } from "../../src/module/components/forms/Crud";
import { ColumnDefinition } from "../../src/module/types";
import { Product } from "../../models/Product";
import { FieldTypes } from "../../src/module/types";
import { FormTypeSelect } from "../../src/module/components/forms/FormTypes/FormTypeSelect";
import { useState } from "@storybook/addons";

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: "uuid",
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
    getCellClass: () => {
      return 'bg-success'
    },
  },
  {
    accessorKey: "name",
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

const Template = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState("");
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
        inputFieldName={"Test change"}
        selectOptionsUrl={"/api/get_options"}
        value={selectedValue}
      />
    </>
  );
  const crudRef = useRef<PropsRef>(null);

  return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
};

export const ApiLazyLoad: Story<Props> = Template.bind({});
ApiLazyLoad.args = {
  columns: columns,
  enableGlobalFilter: true,
  crudUrl: `/api/crud`,
  lazyLoad: true,
};
