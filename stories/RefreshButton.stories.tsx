import React from 'react';
import { Meta, Story } from '@storybook/react';

import { RefreshButton, Props } from '../src/components/buttons/RefreshButton';

const meta: Meta = {
  title: 'Buttons/RefreshButton',
  component: RefreshButton,
};

export default meta;

const Template: Story<Props> = args => <RefreshButton {...args} />;
export const Active: Story<Props> = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props> = Template.bind({});
Disabled.args = {
  disabled: true,
};
