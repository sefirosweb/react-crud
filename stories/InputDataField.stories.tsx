import React from 'react';
import { Meta, Story } from '@storybook/react';

import { InputDataField, Props } from '../src/components/forms/InputDataField';

const meta: Meta = {
  title: 'Form/InputDataField',
  component: InputDataField,
};

export default meta;

const Template: Story<Props> = args => <InputDataField {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  data: [
    {
      name: 'Static data 1',
      value: 'value data 1',
    },
    {
      name: 'Static data 2',
      value: 'value data 2',
    },
  ],
  label: 'This is search and select options',
};

export const Api: Story<Props> = Template.bind({});
Api.args = {
  url: '/api/get_options',
  label: 'This is search and select options',
};

export const ApiLazyLoad: Story<Props> = Template.bind({});
ApiLazyLoad.args = {
  url: '/api/get_options',
  label: 'This is search and select options',
  lazyLoad: true,
};
