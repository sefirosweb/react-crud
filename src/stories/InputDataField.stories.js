import React from 'react';

import { InputDataField } from './../components/form/InputDataField';

export default {
    title: 'Form/InputDataField',
    component: InputDataField
}

const Template = (args) => <InputDataField {...args} />

export const Default = Template.bind({});
Default.args = {
    url: '/api/crud/options'
};
