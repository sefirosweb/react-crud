import React from 'react';

import { MultiSelectCrud } from './../components/form/MultiSelectCrud';

export default {
    title: 'Form/MultiSelectCrud',
    component: MultiSelectCrud
}

const Template = (args) => <MultiSelectCrud {...args} />

export const Primary = Template.bind({});
Primary.args = {
    primaryKey: 'id',
    primaryKeyId: '50',
    crudUrl: '/api/multiselect',
    columns: [
        {
            Header: '#',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Descripcion',
            accessor: 'description'
        }
    ]
};
