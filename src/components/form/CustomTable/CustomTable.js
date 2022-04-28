/* eslint-disable react/prop-types */
import React, { forwardRef, useImperativeHandle } from 'react'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useFilters,
} from 'react-table'
import { LoadingSpinner } from './../../icons/LoadingSpinner'
import { IndeterminateCheckbox } from '../IndeterminateCheckbox'
import TableFooter from '../Crud/TableFooter'

const CustomTable = forwardRef((props, ref) => {
    const { columns, data, filter, canSelectRow, isLoading, className } = props

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state: { pageIndex },
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 15,
                hiddenColumns: columns
                    .filter((f) => f.visible === false)
                    .map((f) => f.accessor),
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                if (canSelectRow !== true) {
                    return [...columns]
                }
                return [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox
                                    {...getToggleAllRowsSelectedProps()}
                                />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox
                                    {...row.getToggleRowSelectedProps()}
                                />
                            </div>
                        ),
                    },
                    ...columns,
                ]
            })
        }
    )

    useEffect(() => {
        setGlobalFilter(filter)
    }, [filter, data, setGlobalFilter])

    useImperativeHandle(ref, () => ({
        selectedFlatRows,
    }))

    return (
        <>
            <Table
                striped
                hover
                className={`${className}`}
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup, keyHeaderGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={keyHeaderGroup}
                        >
                            {headerGroup.headers.map((column, keyColumn) => {
                                const sortable = column.sortable
                                    ? {
                                          ...column.getHeaderProps(
                                              column.getSortByToggleProps()
                                          ),
                                      }
                                    : { ...column.getHeaderProps() }
                                return (
                                    <th {...sortable} key={keyColumn}>
                                        {column.render('Header')}
                                        <span>
                                            {column.sortable
                                                ? column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ' - '
                                                : ''}
                                        </span>
                                        <div>
                                            {column.Filter
                                                ? column.render('Filter')
                                                : null}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                {isLoading ? (
                    <tbody>
                        <tr>
                            <td colSpan={100} className="text-center">
                                <LoadingSpinner className="m-3" />
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, keyPageMap) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={keyPageMap}>
                                    {row.cells.map((cell, keyCellMap) => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                key={keyCellMap}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                )}
            </Table>

            <TableFooter
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                pageCount={pageCount}
            />
        </>
    )
})

CustomTable.displayName = 'CustomTable'

export { CustomTable }
