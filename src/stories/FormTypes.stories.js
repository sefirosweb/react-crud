import React from 'react'
import { FormTypes } from '../components/form/FormTypes'

export default {
    title: 'Form/FormTypes',
    component: FormTypes,
}

const Template = (args) => <FormTypes {...args} />

export const Text = Template.bind({})
Text.args = {
    type: 'text',
    selectOptionsUrl: '',
    inputFieldName: 'input_field_name',
    label: 'Insert text',
    isLoading: false,
}

export const TextArea = Template.bind({})
TextArea.args = {
    type: 'textarea',
    selectOptionsUrl: '',
    inputFieldName: 'input_field_name',
    label: 'Insert text',
    isLoading: false,
}

export const Password = Template.bind({})
Password.args = {
    type: 'password',
    selectOptionsUrl: '',
    inputFieldName: 'input_field_name',
    label: 'Insert text',
    isLoading: false,
}

export const Select = Template.bind({})
Select.args = {
    type: 'select',
    selectOptionsUrl: '/api/getSelectOptions',
    inputFieldName: 'input_field_name',
    label: 'Select option',
    isLoading: false,
}
