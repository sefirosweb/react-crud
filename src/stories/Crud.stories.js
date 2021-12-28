import React from 'react';
import { storiesOf } from '@storybook/react';
import { Crud } from '../components/form/Crud';
import useState from 'storybook-addon-state';


const CRUDStory = storiesOf('Form/CRUD', module);
CRUDStory.add('Simple', () => {

    const columns = [
        {
            primaryKey: true,
            Header: '#',
            accessor: 'id'
        },
        {
            titleOnDelete: true, // This show when is going to "delete button"
            titleOnCRUD: 'Label Item Type', // Label on CRUD modal
            Header: 'Item Type', // Header Table
            accessor: 'name', // data from request
            editable: true
        }
    ]


    const options = {
        columns,
        crudUrl: `/api/crud`,
        canSearch: true,
        canRefresh: true,

        // CRUD OPTIONS
        createButtonTitle: 'Create new registry',
        canEdit: true,
        canDelete: true,
    }

    return <Crud options={options} />

});