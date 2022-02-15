import React from 'react'
import { Button } from 'react-bootstrap'
import { Crud } from '../components/form/Crud'

export default {
    title: 'Form/CRUD',
    component: Crud,
}

const Template = (args) => <Crud {...args} />
export const Simple = Template.bind({})
Simple.args = {
    lazyLoad: false,
    canSearch: true,
    canRefresh: true,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'Create new registry',
    canEdit: true,
    canDelete: true,
    canSelectRow: false,
    crudUrl: `/api/crud`,

    columns: [
        {
            Header: '#',
            accessor: 'id',
            visible: true,
        },
        {
            titleOnCRUD: 'Label Item Type',
            Header: 'Item Type',
            accessor: 'name',
            editable: true,
        },
    ],
}

export const AdvancedFields = Template.bind({})
AdvancedFields.args = {
    lazyLoad: false,
    canSearch: true,
    canRefresh: true,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'Create new registry',
    canEdit: true,
    canDelete: true,
    canSelectRow: true,
    crudUrl: `/api/crud`,

    columns: [
        {
            Header: '#',
            accessor: 'id',
            visible: true,
            sortable: true,
        },
        {
            titleOnCRUD: 'Label Item Type',
            Header: 'Item Type',
            accessor: 'name',
            editable: true,
            sortable: true,
        },
        {
            titleOnCRUD: 'Secret Label for passwords',
            Header: 'Secret Label',
            accessor: 'sku_base',
            editable: true,
            type: 'password',
            sortable: true,
        },
        {
            titleOnCRUD: 'Select Field Type',
            Header: 'Select Type',
            accessor: 'field_type',
            type: 'select',
            selectOptionsUrl: '/api/getSelectOptions',
            editable: true,
            sortable: true,
        },
        {
            titleOnCRUD: 'Select Check Type',
            Header: 'Check Type',
            accessor: 'check_box',
            type: 'checkbox',
            editable: true,
            sortable: true,
            Cell: (row) =>
                row.cell.row.original.check_box === 'true'
                    ? 'active'
                    : 'inactive',
        },
        {
            titleOnCRUD: 'Multi Select',
            Header: 'Multi Select',
            accessor: 'field_type_muliselect',
            type: 'multiselect',
            multiSelectOptionsUrl: `/api/multiselect`,
            multiSelectOptionsPrimaryKey: `id`,
            multiSelectOptionsColumns: [
                {
                    Header: '#',
                    accessor: 'id',
                },
                {
                    Header: 'Campo',
                    accessor: 'field',
                },
                {
                    Header: 'Descripcion',
                    accessor: 'description',
                },
            ],
            editable: true,
        },
    ],
}

export const lazyLoad = Template.bind({})
lazyLoad.args = {
    lazyLoad: true,
    canSearch: true,
    canRefresh: true,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'Create new registry',
    canEdit: false,
    canDelete: false,
    canSelectRow: false,
    crudUrl: `/api/crud`,

    columns: [
        {
            Header: '#',
            accessor: 'id',
            visible: true,
            sortable: true,
        },
        {
            titleOnCRUD: 'Label Item Type',
            Header: 'Item Type',
            accessor: 'name',
            editable: true,
            sortable: true,
            filter: true,
        },
        {
            titleOnCRUD: 'Secret Label for passwords',
            Header: 'Secret Label',
            accessor: 'sku_base',
            editable: true,
            type: 'password',
            sortable: true,
            filter: true,
        },
        {
            titleOnCRUD: 'Select Field Type',
            Header: 'Select Type',
            accessor: 'field_type',
            type: 'select',
            selectOptionsUrl: '/api/getSelectOptions',
            editable: true,
            sortable: true,
        },
    ],
}

export const customButtons = Template.bind({})
customButtons.args = {
    lazyLoad: false,
    canSearch: false,
    canRefresh: false,

    primaryKey: 'id',
    titleOnDelete: 'name',

    createButtonTitle: 'Create new registry',
    customButtons: (
        <Button
            onClick={() => {
                console.log('Button clicked!')
            }}
            className="mx-3"
        >
            Hello World
        </Button>
    ),
    canEdit: false,
    canDelete: false,
    crudUrl: `/api/crud`,

    columns: [
        {
            Header: '#',
            accessor: 'id',
        },
        {
            titleOnCRUD: 'Name',
            Header: 'Item Type',
            accessor: 'name',
            editable: true,
        },
        {
            Header: 'Secret Label',
            accessor: 'sku_base',
        },
    ],
}
