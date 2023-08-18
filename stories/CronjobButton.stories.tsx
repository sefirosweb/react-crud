import { Meta, StoryObj } from '@storybook/react';
import { CronjobButton, Props } from '../src/components/buttons/CronjobButton';

const meta: Meta = {
  title: 'Buttons/CronjobButton',
  component: CronjobButton,
};

export default meta;

type Story = StoryObj<typeof CronjobButton>;

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