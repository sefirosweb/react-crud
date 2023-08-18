import { Meta, StoryObj } from '@storybook/react';
import { PlayButton } from '../src/components/buttons/PlayButton';

const meta: Meta = {
  title: 'Buttons/PlayButton',
  component: PlayButton,
};

export default meta;

type Story = StoryObj<typeof PlayButton>;

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
