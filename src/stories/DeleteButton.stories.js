import React from 'react'

import { DeleteButton } from '../components/buttons/DeleteButton'

export default {
    title: 'Buttons/DeleteButton',
    component: DeleteButton,
}

const Template = (args) => <DeleteButton {...args} />

export const Active = Template.bind({})
Active.args = {
    disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
}
