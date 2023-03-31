import { useState } from 'react'
import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, ColumnDef } from "@tanstack/react-table";
import { Table } from 'react-bootstrap';

const data: Array<any> = [
    {
        id: 1,
        name: null, // change here to string value or null to see issue
    },
    {
        id: 2,
        name: 'hello',
    },
    {
        id: 3,
        name: 'welcome',
    },
]

const columns: Array<ColumnDef<any>> = [
    {
        accessorKey: 'id'
    },
    {
        accessorKey: 'name'
    },
]

export const TestComponent = () => {
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getColumnCanGlobalFilter: () => true
    })

    return (
        <>
            <div>
                <input type='text'
                    value={globalFilter}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value)
                    }}
                />
            </div>

            <Table>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}