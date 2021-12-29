import React from 'react';

import { RefreshButton } from '../components/buttons/RefreshButton';

export default {
    title: 'Buttons/RefreshButton',
    component: RefreshButton
}

const Template = (args) => <RefreshButton {...args} />

export const Active = Template.bind({});
Active.args = {
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};