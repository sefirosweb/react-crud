import React from 'react';
import { Meta, Story } from '@storybook/react';

import { FormTypes, Props } from '../../react_components/src/components/forms/FormTypes';
import { FieldTypes } from '../../react_components/src/types';

const meta: Meta = {
  title: 'Form/FormTypes',
  component: FormTypes,
};

export default meta;

const Template: Story<Props> = args => <FormTypes {...args} />;
export const MultiFormType: Story<Props> = Template.bind({});
MultiFormType.args = {
  label: 'This is a multi form type',
  type: FieldTypes.TEXT,
  name: 'form_multi_type',
  controlId: 'form_multi_type',
  handleChange: (e) => { console.log(e) }
};
