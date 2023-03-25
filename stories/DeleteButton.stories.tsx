import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DeleteButton, Props } from '../react_components/src/components/buttons/DeleteButton';

const meta: Meta = {
  title: 'Buttons/DeleteButton',
  component: DeleteButton,
};

export default meta;

const Template: Story<Props> = args => <DeleteButton {...args} />;
export const Active: Story<Props> = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props> = Template.bind({});
Disabled.args = {
  disabled: true,
};
