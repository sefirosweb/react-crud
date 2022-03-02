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
    inputFieldName: 'input_field_name_text',
    label: 'Insert text',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}

export const Number = Template.bind({})
Number.args = {
    type: 'number',
    inputFieldName: 'input_field_name_number',
    label: 'Insert number',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}

export const TextArea = Template.bind({})
TextArea.args = {
    type: 'textarea',
    inputFieldName: 'input_field_name_textarea',
    label: 'Insert text area',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}

export const Password = Template.bind({})
Password.args = {
    type: 'password',
    inputFieldName: 'input_field_name_password',
    label: 'Insert password',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}

export const Select = Template.bind({})
Select.args = {
    type: 'select',
    selectOptionsUrl: '/api/getSelectOptions',
    inputFieldName: 'input_field_name_select',
    label: 'Select option',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}

export const Checkbox = Template.bind({})
Checkbox.args = {
    type: 'checkbox',
    inputFieldName: 'input_field_name_checkbox',
    label: 'Check option',
    isLoading: false,
    handleChange: (e) => console.log(e),
    value: '',
}
