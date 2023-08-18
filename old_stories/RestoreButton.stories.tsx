import React from 'react';
import { Meta, Story } from '@storybook/react';

import { RestoreButton, Props } from '../react_components/src/components/buttons/RestoreButton';

const meta: Meta = {
  title: 'Buttons/RestoreButton',
  component: RestoreButton,
};

export default meta;

const Template: Story<Props> = args => <RestoreButton {...args} />;
export const Active: Story<Props> = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props> = Template.bind({});
Disabled.args = {
  disabled: true,
};
