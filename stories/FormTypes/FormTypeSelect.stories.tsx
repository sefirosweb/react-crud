import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeSelect,
  Props,
} from '../../src/components/forms/FormTypes/FormTypeSelect';

const meta: Meta = {
  title: 'Form/FormTypes/Select',
  component: FormTypeSelect,
};

export default meta;

const Template: Story<Props> = args => <FormTypeSelect {...args} />;
export const Select: Story<Props> = Template.bind({});
Select.args = {
  label: 'Form Type Select',
  selectOptionsUrl: '/api/get_options',
  inputFieldName: 'form_select',
  handleChange: (e) => {console.log(e)}
};
