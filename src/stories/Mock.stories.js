import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' })

const optionsWithValue = [
    {
        name: 'Door 1',
        value: '15',
    },
    {
        name: 'Desktop 2',
        value: '33',
    },
    {
        name: 'Computer 3',
        value: '412',
    },
    {
        name: 'Loktar 4',
        value: '132312',
    },
]

mock.onGet('/api/getSelectOptionsWithValue').reply(200, {
    success: true,
    data: optionsWithValue,
})

import { InputDataField } from './../components/form/InputDataField'

export default {
    title: 'Form/Mock',
    component: InputDataField,
}

const Template = (args) => <InputDataField {...args} />

export const Default = Template.bind({})
Default.args = {
    url: '/api/getSelectOptionsWithValue',
}
