import React from 'react'
import { Form } from 'react-bootstrap'
import { Table } from '../components/form/Table'
import { makeRandomText } from './helpers'

const tableGenerator = () => {
    const random = Math.floor(Math.random() * 300)
    const data = []
    for (var i = 0; i < random; i++) {
        data.push({
            id: makeRandomText(5),
            ean: makeRandomText(8),
            sku_base: makeRandomText(9),
            descripcion: makeRandomText(50),
        })
    }
    return data
}

const newColumns = [
    {
        Header: '#',
        accessor: 'id',
    },
    {
        Header: 'Ean',
        accessor: 'ean',
    },
    {
        Header: 'Sku',
        accessor: 'sku_base',
    },
    {
        Header: 'Descripcion',
        accessor: 'descripcion',
    },
]

const dataTable = tableGenerator()

export default {
    title: 'Form/Table',
    component: Table,
}

const Template = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
    isLoading: false,
    canSelectRow: false,
    columns: newColumns,
    data: dataTable,
}

export const canSelectRow = Template.bind({})
canSelectRow.args = {
    isLoading: false,
    canSelectRow: true,
    columns: newColumns,
    data: dataTable,
}

export const editInLine = Template.bind({})
editInLine.args = {
    isLoading: false,
    canSelectRow: true,
    columns: [
        {
            Header: '#',
            accessor: 'id',
        },
        {
            Header: 'Ean',
            accessor: 'ean',
        },
        {
            Header: 'Sku',
            accessor: 'sku_base',
            Cell: (row) => {
                return (
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={row.cell.row.original.total}
                            onChange={(e) => console.log(e)}
                        />
                    </Form.Group>
                )
            },
        },
    ],
    data: dataTable,
}

export const loading = Template.bind({})
loading.args = {
    isLoading: true,
    canSelectRow: false,
    columns: newColumns,
    data: dataTable,
}
