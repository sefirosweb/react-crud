import React from 'react';
import { Story } from '@storybook/react';

import { Crud, Props } from '../../react_components/src/components/forms/Crud';
import { ColumnDefinition } from '../../react_components/src/types';
import { Product, data } from '../../models/Product';

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



const Template: Story<Props> = (args) => <Crud {...args} />;
export const SubTable: Story<Props> = Template.bind({});
SubTable.args = {
  columns: columns,
  data: data,
};
