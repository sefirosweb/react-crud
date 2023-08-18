import { Meta, StoryObj } from '@storybook/react';
import { InputDataField } from '../src/components/forms/InputDataField';

const meta: Meta = {
  title: 'Form/InputDataField',
  component: InputDataField,
};

export default meta;

type Story = StoryObj<typeof InputDataField>;

export const Template: Story = {
  args: {
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
  },
}

export const Api: Story = {
  args: {
    url: '/api/get_options',
    label: 'This is search and select options',
  },
}

export const ApiLazyLoad: Story = {
  args: {
    url: '/api/get_options',
    label: 'This is search and select options',
    lazyLoad: true,
  },
}
