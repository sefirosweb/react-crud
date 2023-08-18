import { Meta, StoryObj } from '@storybook/react';
import { Crud } from '../../src/components/forms/Crud';
import { ColumnDefinition } from '../../src/types';
import { Product, data } from '../../test/mockData/Product';

const meta: Meta = {
  title: 'Tables/Crud',
  component: Crud,
};

export default meta;

type Story = StoryObj<typeof Crud>;

const columns: Array<ColumnDefinition<Product>> = [
  {
    header: 'Pedido',
    columns: [
      {
        accessorKey: 'uuid',
        enableSorting: true,
      }
    ]
  },
  {
    header: 'More Info',
    columns: [
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
    ],
  },
];

export const SubTables: Story = {
  args: {
    columns: columns,
    data: data,
  },

}
