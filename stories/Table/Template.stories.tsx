import { Meta, StoryObj } from '@storybook/react';
import { Crud } from '../../src/components/forms/Crud';
import { ColumnDefinition, EnableGlobalFilterLabels } from '../../src/types';
import { Product, data } from '../../test/mockData/Product';

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    header: 'UUID',
  },
  {
    accessorKey: 'ean',
    header: 'EAN',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
];

const enableGlobalFilterLabels: Array<EnableGlobalFilterLabels> = columns.map(column => {
  return {
    label: column.header,
    filter: column.accessorKey
  }
})


export const Template: Story = {
  args: {
    columns: columns,
    data: data,
    canRefresh: true,
    canExport: true,
    enableGlobalFilter: true,
    enableGlobalFilterLabels
  },
}