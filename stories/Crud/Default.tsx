import React from 'react';
import { Story } from '@storybook/react';

import { Crud, Props } from '../../src/components/forms/Crud';
import { ColumnDefinition } from '../../src/types';
import { Product, data } from '../../models/Product';

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    enableSorting: true,
  },
  {
    accessorKey: 'ean',
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'description',
  },
  {
    accessorKey: 'price',
  },
  {
    accessorKey: 'category',
  },
];

const Template: Story<Props> = (args) => <Crud {...args} />;
export const Default: Story<Props> = Template.bind({});
Default.args = {
  columns: columns,
  data: data,
};
