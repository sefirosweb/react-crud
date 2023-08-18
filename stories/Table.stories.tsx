import { Meta, StoryObj } from '@storybook/react';

import { Table } from '../src/components/forms/Table';
import { Product, data } from '../test/mockData/Product';
import { ColumnDefinition } from '../src/types';

const meta: Meta = {
  title: 'Tables/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    header: 'UUID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
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

export const Template: Story = {
  args: {
    columns,
    data: data.slice(0, 10),
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: data.slice(0, 10),
    isLoading: true,
  },
}
