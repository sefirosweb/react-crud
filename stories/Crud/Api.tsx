import React, { useRef, useState } from 'react';
import { Story } from '@storybook/react';

import { Crud, Props, PropsRef } from '../../react_components/src/components/forms/Crud';
import { ColumnDefinition, SelectOption } from '../../react_components/src/types';
import { Product } from '../../models/Product';
import { FieldTypes } from '../../react_components/src/types';
import { FormTypeSelect } from '../../react_components/src/components/forms/FormTypes/FormTypeSelect';

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

const Template = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (option: SelectOption | null) => {
    setSelectedValue(option?.value ?? '');

    const lazyFilter = {
      category_id: option?.value ?? '',
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
};

export const Api: Story<Props> = Template.bind({});
Api.args = {
  columns: columns,
  enableGlobalFilter: true,
  crudUrl: `/api/crud`,
  canRefresh: true,
  canExport: true,
  exportName: "API Excel "
};
