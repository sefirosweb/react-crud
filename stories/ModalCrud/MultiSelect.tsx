import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import { Story } from '@storybook/react';
import {
  MultiSelectCrud,
  Props,
} from '../../src/components/forms/MultiSelectCrud';
import { Product } from '../../models/Product';
import { ColumnDefinition } from '../../src/types';

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

const Template = (props: Props) => {
  const { primaryKey, primaryKeyId, crudUrl, columns, getDataUrl, title } =
    props;

  const [show, setShow] = useState(false);

  const onExitModal = () => {
    console.log('Exiting modal');
  };

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
        columns={columns}
        crudUrl={crudUrl}
        primaryKey={primaryKey}
        primaryKeyId={primaryKeyId}
        onExitModal={onExitModal}
        getDataUrl={getDataUrl}
        title={title}
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export const MultiSelect: Story<Props> = Template.bind({});
MultiSelect.args = {
  primaryKey: 'uuid',
  primaryKeyId: '1',
  crudUrl: '/api/sub_table',
  getDataUrl: '/api/sub_table/get_array',
  title: 'Title for CRUD',
  columns: TestColumnsModel,
};
