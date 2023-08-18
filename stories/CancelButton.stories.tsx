import { Meta, StoryObj, } from '@storybook/react';
import { CancelButton } from '../src/components/buttons/CancelButton';

const meta: Meta = {
  title: 'Buttons/CancelButton',
  component: CancelButton,
};

export default meta;

type Story = StoryObj<typeof CancelButton>;

export const Active: Story = {
  args: {
    disabled: false
  },
}

export const Disabled: Story = {
  args: {
    disabled: true
  },
}