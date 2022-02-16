import React from 'react'

import { CancelButton } from '../components/buttons/CancelButton'

export default {
    title: 'Buttons/CancelButton',
    component: CancelButton,
}

const Template = (args) => <CancelButton {...args} />

export const Active = Template.bind({})
Active.args = {
    disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
}