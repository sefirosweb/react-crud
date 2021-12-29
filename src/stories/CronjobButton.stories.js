import React from 'react';

import { CronjobButton } from '../components/buttons/CronjobButton';

export default {
    title: 'Buttons/CronjobButton',
    component: CronjobButton
}

const Template = (args) => <CronjobButton {...args} />

export const Active = Template.bind({});
Active.args = {
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};