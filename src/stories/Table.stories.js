import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from '../components/form/Table';
import useState from 'storybook-addon-state';
import { makeRandomText } from './helpers'

const TableHistory = storiesOf('Form/Table', module);
TableHistory.add('Primary', () => {

    const tableGenerator = () => {
        const random = Math.floor(Math.random() * 300)
        const data = []
        for (var i = 0; i < random; i++) {
            data.push(
                {
                    "id": makeRandomText(5),
                    "ean": makeRandomText(8),
                    "sku_base": makeRandomText(9),
                    "descripcion": makeRandomText(50),
                }
            )
        }
        return data
    }

    const [isLoadingTable, setIsLoadingTable] = useState('isLoadingTable', false)

    const newColumns =
        [
            {
                Header: '#',
                accessor: 'id'
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
            }
        ]

    const dataTable = tableGenerator()

    return (
        <Table
            data={dataTable}
            columns={newColumns}
            isLoading={isLoadingTable}
        // canSelectRow={true}
        // ref={tableRef}
        />

    );
});

TableHistory.add('Select Rows', () => {

    const tableGenerator = () => {
        const random = Math.floor(Math.random() * 300)
        const data = []
        for (var i = 0; i < random; i++) {
            data.push(
                {
                    "id": makeRandomText(5),
                    "ean": makeRandomText(8),
                    "sku_base": makeRandomText(9),
                    "descripcion": makeRandomText(50),
                }
            )
        }
        return data
    }

    const [isLoadingTable, setIsLoadingTable] = useState('isLoadingTable', false)

    const newColumns =
        [
            {
                Header: '#',
                accessor: 'id'
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
            }
        ]

    const dataTable = tableGenerator()

    return (
        <Table
            data={dataTable}
            columns={newColumns}
            isLoading={isLoadingTable}
            canSelectRow={true}
        // ref={tableRef}
        />

    );
});

TableHistory.add('Loading', () => {

    const tableGenerator = () => {
        const random = Math.floor(Math.random() * 300)
        const data = []
        for (var i = 0; i < random; i++) {
            data.push(
                {
                    "id": makeRandomText(5),
                    "ean": makeRandomText(8),
                    "sku_base": makeRandomText(9),
                    "descripcion": makeRandomText(50),
                }
            )
        }
        return data
    }

    const [isLoadingTable, setIsLoadingTable] = useState('isLoadingTable', true)

    const newColumns =
        [
            {
                Header: '#',
                accessor: 'id'
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
            }
        ]

    const dataTable = tableGenerator()

    return (
        <Table
            data={dataTable}
            columns={newColumns}
            isLoading={isLoadingTable}
            canSelectRow={true}
        // ref={tableRef}
        />

    );
});