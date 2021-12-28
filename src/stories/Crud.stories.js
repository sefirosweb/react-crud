import React from 'react';
import { Crud } from '../components/form/Crud';

export default {
    title: 'Form/CRUD',
    component: Crud
}

const Template = (args) => <Crud {...args} />
export const Simple = Template.bind({});
Simple.args = {
    options: {
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
        ],
        crudUrl: `/api/crud`, // Same url is used for GET & CREATE & UPDATE & DELETE, must be have in backend all methods (GET / POST / PUT / DELETED) ajax requests
        canSearch: true, // Enable input box for search
        canRefresh: true, // Enable button for refresh manually

        // CRUD OPTIONS
        createButtonTitle: 'Create new registry', // Button name for create row
        canEdit: true, // Enable to EDIT
        canDelete: true // Enable to DELETE
    }
};

export const AdvancedFields = Template.bind({});
AdvancedFields.args = {
    options: {
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
                selectOptionsUrl: '/api/crud/options',
                editable: true,
                sortable: true
            },
            {
                titleOnCRUD: 'Multi Select',
                Header: 'Multi Select',
                accessor: 'field_type_muliselect',
                type: 'multiselect',
                multiSelectOptionsUrl: `/api/crud/options/modify`,
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
        ],

        crudUrl: `/api/crud`, // Same url is used for GET & CREATE & UPDATE & DELETE, must be have in backend all methods (GET / POST / PUT / DELETED) ajax requests
        canSearch: true, // Enable input box for search
        canRefresh: true, // Enable button for refresh manually

        // CRUD OPTIONS
        createButtonTitle: 'Create new registry', // Button name for create row
        canEdit: true, // Enable to EDIT
        canDelete: true // Enable to DELETE
    }
};