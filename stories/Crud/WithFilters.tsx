import React, { useRef, useState } from 'react';
import { Story } from '@storybook/react';

import { Crud, Props, PropsRef } from '../../src/components/forms/Crud';
import { ColumnDefinition } from '../../src/types';
import { Product, data } from '../../models/Product';
import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';
import { FormTypeSelect } from '../../src/components/forms/FormTypes/FormTypeSelect';

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    enableColumnFilter: true,
    enableSorting: true,
    dropdown: true,
  },
  {
    accessorKey: 'ean',
  },
  {
    accessorKey: 'name',
    header: 'Edad',
  },
  {
    accessorKey: 'description',
    header: 'Desc.',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'price',
  },
  {
    accessorKey: 'category',
  },
];

const Template = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    const updateData: ColumnFilter = {
      id: 'category', // must be exist key
      value: e.target.value,
    };
    const upd: ColumnFiltersState = [updateData];
    crudRef.current.table.setColumnFilters(upd);
  };

  const categories = ['Category Type A', 'Category Type C'];

  const customButtons = (
    <>
      <FormTypeSelect
        handleChange={handleChange}
        inputFieldName={'Test change'}
        value={selectedValue}
        options={categories}
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
