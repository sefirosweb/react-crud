import React from 'react';
import { useState } from 'react';
import { EditButton } from '../../buttons/EditButton';
import {
  MultiSelectCrud,
  Props as MultiSelectCrudProps,
} from '../MultiSelectCrud';

export interface Props extends Omit<MultiSelectCrudProps, 'show' | 'setShow'> {}

export const ShowMultiSelectCrud = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <EditButton onClick={() => setShow(true)} />
      <MultiSelectCrud show={show} setShow={setShow} {...props} />
    </>
  );
};
