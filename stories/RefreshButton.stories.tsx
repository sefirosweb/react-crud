import { Meta, StoryObj } from '@storybook/react';
import { RefreshButton } from '../src/components/buttons/RefreshButton';

const meta: Meta = {
  title: 'Buttons/RefreshButton',
  component: RefreshButton,
};

export default meta;

type Story = StoryObj<typeof RefreshButton>;

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
