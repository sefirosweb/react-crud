import { Meta, StoryObj } from '@storybook/react';
import { LoadingButton } from '../src/components/buttons/LoadingButton';

const meta: Meta = {
  title: 'Buttons/LoadingButton',
  component: LoadingButton,
};

export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Template: Story = {
  args: {
    disabled: true
  },
}