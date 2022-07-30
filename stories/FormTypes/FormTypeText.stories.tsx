import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeText,
  Props,
} from '../../src/components/forms/FormTypes/FormTypeText';

const meta: Meta = {
  title: 'Form/FormTypes/Text',
  component: FormTypeText,
};

export default meta;

const Template: Story<Props> = args => <FormTypeText {...args} />;
export const Text: Story<Props> = Template.bind({});
Text.args = {
  label: 'Form Type Text',
  inputFieldName: 'form_text',
  handleChange: (e) => {console.log(e)}
};
