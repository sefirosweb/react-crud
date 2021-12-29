import React from 'react';

import { EditButton } from '../components/buttons/EditButton';

export default {
    title: 'Buttons/EditButton',
    component: EditButton
}

const Template = (args) => <EditButton {...args} />

export const Active = Template.bind({});
Active.args = {
    disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};