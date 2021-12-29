import React from 'react';
import { Crud } from '../components/form/Crud';

export default {
    title: 'Form/CRUD',
    component: Crud
}

const Template = (args) => <Crud {...args} />
export const Simple = Template.bind({});
Simple.args = {
    canSearch: true,
    canRefresh: true,

    createButtonTitle: 'Create new registry',
    canEdit: true,
    canDelete: true,
    crudUrl: `/api/crud`,

    columns: [
        {
            primaryKey: true,
            Header: '#',
            accessor: 'id',
            visible: true // Show / hide column
        },
        {
            titleOnDelete: true, // This show when is going to "delete button"
            titleOnCRUD: 'Label Item Type', // Label on CRUD modal
            Header: 'Item Type', // Header Table
            accessor: 'name', // data from request
            editable: true
        }
    ]
};

export const AdvancedFields = Template.bind({});
AdvancedFields.args = {
    canSearch: true,
    canRefresh: true,

    createButtonTitle: 'Create new registry',
    canEdit: true,
    canDelete: true,
    crudUrl: `/api/crud`,

    columns: [
        {
            primaryKey: true,
            Header: '#',
            accessor: 'id',
            visible: true,
            sortable: true
        },
        {
            titleOnDelete: true,
            titleOnCRUD: 'Label Item Type',
            Header: 'Item Type',
            accessor: 'name',
            editable: true,
            sortable: true
        },
        {
            titleOnCRUD: 'Secret Label for passwords',
            Header: 'Secret Label',
            accessor: 'sku_base',
            editable: true,
            type: 'password',
            sortable: true
        },
        {
            titleOnCRUD: 'Select Field Type',
            Header: 'Select Type',
            accessor: 'field_type',
            type: 'select',
            selectOptionsUrl: '/api/getSelectOptions',
            editable: true,
            sortable: true
        },
        {
            titleOnCRUD: 'Multi Select',
            Header: 'Multi Select',
            accessor: 'field_type_muliselect',
            type: 'multiselect',
            multiSelectOptionsUrl: `/api/multiselect`,
            multiSelectOptionsUrlColumns: [
                {
                    primaryKey: true,
                    Header: '#',
                    accessor: 'id'
                },
                {
                    Header: 'Campo',
                    accessor: 'field'
                },
                {
                    Header: 'Descripcion',
                    accessor: 'description'
                }
            ],
            editable: true
        }
    ]
};