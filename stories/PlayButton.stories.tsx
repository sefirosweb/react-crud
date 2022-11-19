import React from 'react';
import { Meta, Story } from '@storybook/react';

import { PlayButton, Props } from '../src/module/components/buttons/PlayButton';

const meta: Meta = {
  title: 'Buttons/PlayButton',
  component: PlayButton,
};

export default meta;

const Template: Story<Props> = args => <PlayButton {...args} />;
export const Active: Story<Props> = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props> = Template.bind({});
Disabled.args = {
  disabled: true,
};
