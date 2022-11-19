import React, { useRef, useState } from 'react';
import { Story } from '@storybook/react';

import { Crud, Props, PropsRef } from '../../src/module/components/forms/Crud';
import { ColumnDefinition } from '../../src/module/types';
import { Product } from '../../models/Product';
import { FieldTypes } from '../../src/module/types';
import { FormTypeSelect } from '../../src/module/components/forms/FormTypes/FormTypeSelect';

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    const lazyFilter = {
      custom_lazy_filter: e.target.value,
    };

    crudRef.current.setLazyilters(lazyFilter);
  };

  const customButtons = (
    <>
      <FormTypeSelect
        handleChange={handleChange}
        inputFieldName={'Test change'}
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
};
