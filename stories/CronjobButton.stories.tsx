import React from 'react';
import { Meta, Story } from '@storybook/react';

import { CronjobButton, Props } from '../src/components/buttons/CronjobButton';

const meta: Meta = {
  title: 'Buttons/CronjobButton',
  component: CronjobButton,
};

export default meta;

const Template: Story<Props> = args => <CronjobButton {...args} />;
export const Active: Story<Props>  = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props>  = Template.bind({});
Disabled.args = {
  disabled: true,
};
