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
            titleOnDelete: true,
            Header: 'Item Type',
            accessor: 'name',
        }
    ]


    const options = {
        columns,
        crudUrl: `/api/crud`
    }

    return <Crud options={options} />

});