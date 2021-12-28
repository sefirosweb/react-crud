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