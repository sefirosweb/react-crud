import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeTextArea,
  Props,
} from '../../react_components/src/components/forms/FormTypes/FormTypeTextArea';

const meta: Meta = {
  title: 'Form/FormTypes/TextArea',
  component: FormTypeTextArea,
};

export default meta;

const Template: Story<Props> = args => <FormTypeTextArea {...args} />;
export const TextArea: Story<Props> = Template.bind({});
TextArea.args = {
  label: 'Form Type Text Area',
  rows: 5,
  name: 'form_text_area',
  controlId: 'form_text_area',
  handleChange: (e) => { console.log(e) }
};
