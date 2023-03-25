import React from 'react';
import { Meta, Story } from '@storybook/react';

import { LoadingButton, Props } from '../react_components/src/components/buttons/LoadingButton';

const meta: Meta = {
  title: 'Buttons/LoadingButton',
  component: LoadingButton,
};

export default meta;

const Template: Story<Props> = args => <LoadingButton {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  disabled: true,
};
