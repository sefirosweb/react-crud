import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeNumber,
  Props,
} from '../../src/module/components/forms/FormTypes/FormTypeNumber';

const meta: Meta = {
  title: 'Form/FormTypes/Number',
  component: FormTypeNumber,
};

export default meta;

const Template: Story<Props> = args => <FormTypeNumber {...args} />;
export const Number: Story<Props> = Template.bind({});
Number.args = {
  label: 'Form Type Number',
  name: 'form_number',
  controlId: 'form_number',
  handleChange: (e) => { console.log(e) }
};
