import React from 'react';
import { Meta, Story } from '@storybook/react';

import { CancelButton, Props } from '../src/components/buttons/CancelButton';

const meta: Meta = {
  title: 'Buttons/CancelButton',
  component: CancelButton,
};

export default meta;

const Template: Story<Props> = args => <CancelButton {...args} />;
export const Active: Story<Props>  = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props>  = Template.bind({});
Disabled.args = {
  disabled: true
};
