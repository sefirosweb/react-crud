import React from 'react'

import { InputDataField } from './../components/form/InputDataField'

export default {
    title: 'Form/InputDataField',
    component: InputDataField,
}

const Template = (args) => <InputDataField {...args} />

export const Default = Template.bind({})
Default.args = {
    label: 'Select one option',
    url: '/api/getSelectOptionsWithValue',
    lazyLoad: false,
}
export const LazyLoad = Template.bind({})
LazyLoad.args = {
    label: 'Options with lazy load',
    url: '/api/getSelectOptionsWithValueLazyLoad',
    lazyLoad: true,
}
