import { Meta, StoryObj } from '@storybook/react';

import { DeleteButton } from '../src/components/buttons/DeleteButton';

const meta: Meta = {
  title: 'Buttons/DeleteButton',
  component: DeleteButton,
};

export default meta;

type Story = StoryObj<typeof DeleteButton>;

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
