import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MultiSelectCrud } from '../../src/components/forms/MultiSelectCrud';
import { Product } from '../../test/mockData/Product';
import { ColumnDefinition } from '../../src/types';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Form/MultiSelectCrud',
  component: MultiSelectCrud,
};

export default meta;

type Story = StoryObj<typeof MultiSelectCrud>;

const TestColumnsModel: ColumnDefinition<Product>[] = [
  {
    accessorKey: 'uuid',
    enableHiding: true,
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'category',
  },
];

export const Template: Story = {
  args: {
    primaryKey: 'uuid',
    primaryKeyId: '1',
    crudUrl: '/api/sub_table',
    getDataUrl: '/api/get_options',
    title: 'Title for CRUD',
    columns: TestColumnsModel,
  },
  render: (props) => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button
          variant="info"
          onClick={() => {
            setShow(true);
          }}
        >
          Open multi select modal
        </Button>

        <MultiSelectCrud
          {...props}

          show={show}
          setShow={setShow}
        />
      </>
    )
  }
}
