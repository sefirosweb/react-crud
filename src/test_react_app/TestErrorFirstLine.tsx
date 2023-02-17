//@ts-nocheck

// Issue: https://github.com/TanStack/table/issues/4711

import React, { useState } from 'react'
import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, ColumnDef } from "@tanstack/react-table";

const data: Array<any> = [
    {
        id: 1,
        name: 'null',
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

const TestComponent = () => {
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
        globalFilterFn: (row, column, value) => {
            console.log({ row })
            console.log({ column })
            console.log({ value })
        }
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

            <table>
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
            </table>
        </>
    )
}

export default TestComponent