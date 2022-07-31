import React from 'react';
import { Story } from '@storybook/react';

import { Crud, Props } from '../../src/components/forms/Crud';
import { ColumnDefinition, MultiSelectOptionsColumns } from '../../src/types';
import { Product } from '../../models/Product';
import { FieldTypes } from '../../src/types';

const multiSelectOptionsColumnsValues: MultiSelectOptionsColumns<Product> = {
  primaryKey: 'id',
  url: '/api/sub_table',
  getDataUrl: '/api/get_options',
  lazyLoad: true,
  onExitModalRefresh: true,
  onExitModal: () => {
    console.log('Log on exit modal');
  },
  title: 'Editing Table Multi Select',
  columns: [
    {
      accessorKey: 'uuid',
    },
    {
      accessorKey: 'name',
    },
  ],
};

const columns: Array<ColumnDefinition<Product>> = [
  {
    accessorKey: 'uuid',
    visible: false,
  },
  {
    accessorKey: 'ean',
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    editable: true,
    enableSorting: true,
  },
  {
    accessorKey: 'category_id',
    header: 'Cat.',
    cell: (props) => props.row.original.category,
    editable: true,
    fieldType: FieldTypes.SELECT,
    selectOptionsUrl: '/api/get_options',
  },
  {
    header: 'Desc',
    titleOnCRUD: 'Description',
    accessorKey: 'description',
    editable: true,
  },
  {
    accessorKey: 'price',
    header: '€',
    editable: true,
    fieldType: FieldTypes.NUMBER,
  },
  {
    id: 'multi_select',
    header: 'Multi Select',
    editable: true,
    fieldType: FieldTypes.MULTISELECT,
    multiSelectOptions: multiSelectOptionsColumnsValues,
  },
];

const Template: Story<Props> = (args) => <Crud {...args} />;
export const CreateDeleteUpdate: Story<Props> = Template.bind({});
CreateDeleteUpdate.args = {
  columns: columns,
  enableGlobalFilter: true,
  canRefresh: true,
  crudUrl: `/api/crud`,
  canDelete: true,
  canEdit: true,
  primaryKey: 'uuid',
  createButtonTitle: 'Create a new record',
  titleOnDelete: 'name',
};
