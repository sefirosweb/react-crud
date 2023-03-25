import React, { useEffect, useRef } from "react";
import { Story } from "@storybook/react";

import { Crud, Props, PropsRef } from "../../react_components/src/components/forms/Crud";
import { ColumnDefinition } from "../../react_components/src/types";
import { Product } from "../../models/Product";
import { FieldTypes } from "../../react_components/src/types";
import { FormTypeSelect } from "../../react_components/src/components/forms/FormTypes/FormTypeSelect";
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
};

export const ApiLazyLoad: Story<Props> = Template.bind({});
ApiLazyLoad.args = {
  columns: columns,
  enableGlobalFilter: true,
  crudUrl: `/api/crud`,
  lazyLoad: true,
};
