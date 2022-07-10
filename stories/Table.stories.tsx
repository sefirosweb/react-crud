import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Table, Props } from '../src/components/forms/Table'
import { ColumnDef } from '@tanstack/table-core'


const meta: Meta = {
    title: 'Table',
    component: Table
}

export default meta



type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const data: Person[] = [
    {
        firstName: 'javi',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName'
    },
    {
        accessorKey: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>
    },
    {
        accessorKey: 'age',
    },
    {
        accessorKey: 'visits',
        header: 'Status'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
    },
]

const Template: Story<Props> = (args) => <Table {...args} />
export const Templatebind = Template.bind({})
Templatebind.args = {
    columns: columns,
    data: data
}
