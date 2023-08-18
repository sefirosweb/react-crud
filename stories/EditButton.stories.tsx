import { Meta, StoryObj } from '@storybook/react';
import { EditButton } from '../src/components/buttons/EditButton';

const meta: Meta = {
  title: 'Buttons/EditButton',
  component: EditButton,
};

export default meta;

type Story = StoryObj<typeof EditButton>;

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
