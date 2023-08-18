import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Crud, Props, PropsRef } from '../../src/components/forms/Crud';
import { ColumnDefinition } from '../../src/types';
import { Product } from '../../test/mockData/Product';
import { FieldTypes } from '../../src/types';
import { FormTypeSelect } from '../../src/components/forms/FormTypes/FormTypeSelect';

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;


const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    enableColumnFilter: true,
    dropdown: true,
  },
  {
    accessorKey: 'ean',
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'description',
    header: 'Desc.',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'price',
    header: '€',
  },
  {
    accessorKey: 'category_id',
    header: 'Cat.',
    cell: (props) => props.row.original.category,
    enableColumnFilter: true,
    fieldType: FieldTypes.SELECT,
    selectOptionsUrl: '/api/get_options',
  },
];

export const Api: Story = {
  args: {
    columns: columns,
    enableGlobalFilter: true,
    crudUrl: `/api/crud`,
    canRefresh: true,
    canExport: true,
    exportName: "API Excel "
  },
  render: (props) => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);

      const lazyFilter = {
        category_id: e.target.value,
      };

      crudRef.current?.setLazyilters(lazyFilter);
    };

    const customButtons = (
      <>
        <FormTypeSelect
          handleChange={handleChange}
          name='Test change'
          controlId='Test change'
          selectOptionsUrl={'/api/get_options'}
          value={selectedValue}
        />
      </>
    );
    const crudRef = useRef<PropsRef>(null);

    return <Crud {...props} customButtons={customButtons} ref={crudRef} />;
  },
}
