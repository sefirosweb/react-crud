import { Meta } from '@storybook/react';

import { Crud } from '../../react_components/src/components/forms/Crud';

const meta: Meta = {
  title: 'Form/Crud',
  component: Crud,
};

export default meta;

export * from './Default';
export * from './WithFilters';
export * from './SelectRow';
export * from './Api';
export * from './ApiLazyLoad';
export * from './CreateDeleteUpdate';
export * from './SubTables';
