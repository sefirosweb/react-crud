import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Table, Props } from '../src/components/forms/Table';
import { Product, data } from '../models/Product';
import { ColumnDefinition } from '../src/types';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

const columns: ColumnDefinition<Product>[] = [
  {
    accessorKey: 'uuid',
  },
  {
    accessorKey: 'name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: 'description',
    header: 'Desc.',
  },
  {
    accessorKey: 'price',
    header: '€',
  },
  {
    accessorKey: 'category',
    header: 'Cat.',
  },
];

const Template: Story<Props> = (args) => <Table {...args} />;
export const Default: Story<Props> = Template.bind({});
Default.args = {
  columns: columns,
  data: data,
};

export const Loading: Story<Props> = Template.bind({});
Loading.args = {
  columns: columns,
  data: data,
  isLoading: true,
};
