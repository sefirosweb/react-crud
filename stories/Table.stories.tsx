import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Table, Props } from '../src/components/forms/Table'


const meta: Meta = {
    title: 'Table',
    component: Table
}

export default meta

const Template: Story<Props> = () => <Table />
export const Templatebind = Template.bind({})
