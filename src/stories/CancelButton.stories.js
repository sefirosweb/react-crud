import React from 'react';

import useState from 'storybook-addon-state';

import CancelButton from '../components/buttons/CancelButton';

export default {
    title: 'Buttons/Cancel',
    component: CancelButton
}

const Template = (args) => <CancelButton {...args} />

export const Active = Template.bind({});
Active.args = {
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};