import React from 'react';
import { Meta, Story } from '@storybook/react';

import { FormTypes, Props } from '../../src/module/components/forms/FormTypes';
import { FieldTypes } from '../../src/module/types';

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
