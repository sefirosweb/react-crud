import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeDate,
  Props,
} from '../../src/module/components/forms/FormTypes/FormTypeDate';

const meta: Meta = {
  title: 'Form/FormTypes/Date',
  component: FormTypeDate,
};

export default meta;

const Template: Story<Props> = args => <FormTypeDate {...args} />;
export const Date: Story<Props> = Template.bind({});
Date.args = {
  label: 'Form Type Date',
  name: 'form_date',
  controlId: 'form_date',
  handleChange: (e) => { console.log(e) }
};
