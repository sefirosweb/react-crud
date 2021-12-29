import React from 'react';

import { LoadingButton } from '../components/buttons/LoadingButton';

export default {
    title: 'Buttons/LoadingButton',
    component: LoadingButton
}

const Template = (args) => <LoadingButton {...args} />

export const Default = Template.bind({});
Default.args = {

};