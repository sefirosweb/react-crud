import { Meta, StoryObj } from '@storybook/react';
import { RestoreButton, } from '../src/components/buttons/RestoreButton';

const meta: Meta = {
  title: 'Buttons/RestoreButton',
  component: RestoreButton,
};

export default meta;

type Story = StoryObj<typeof RestoreButton>;

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
