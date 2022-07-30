import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  FormTypeHtml,
  Props,
} from '../../src/components/forms/FormTypes/FormTypeHtml';

const meta: Meta = {
  title: 'Form/FormTypes/Html',
  component: FormTypeHtml,
};

export default meta;

const Template: Story<Props> = (args) => <FormTypeHtml {...args} />;
export const Html: Story<Props> = Template.bind({});
Html.args = {};
