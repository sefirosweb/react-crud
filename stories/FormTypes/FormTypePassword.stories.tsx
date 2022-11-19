import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypePassword,
  Props,
} from '../../src/module/components/forms/FormTypes/FormTypePassword';

const meta: Meta = {
  title: 'Form/FormTypes/Password',
  component: FormTypePassword,
};

export default meta;

const Template: Story<Props> = args => <FormTypePassword {...args} />;
export const Password: Story<Props> = Template.bind({});
Password.args = {
  label: 'Form Type Password',
  inputFieldName: 'form_password',
  handleChange: (e) => { console.log(e) }
};
