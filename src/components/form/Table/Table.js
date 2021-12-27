import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Col, Form, Pagination, Row } from 'react-bootstrap'
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table'
import { LoadingSpinner } from './../../icons/LoadingSpinner'

const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef()
        const resolvedRef = ref || defaultRef

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

const CustomTable = forwardRef(({ columns, data, filter, canSelectRow, isLoading }, ref) => {
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        prepareRow,
        setGlobalFilter,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 15,
                hiddenColumns: columns.filter(f => f.visible === false).map(f => f.accessor)
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        hooks => {
            hooks.visibleColumns.push(columns => {
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
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
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
    }, [filter, data])


    useImperativeHandle(ref, () => ({
        selectedFlatRows
    }))

    return (
        <>
            <table className="table bg-white rounded shadow-sm table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                const sortable = column.sortable ? { ...column.getHeaderProps(column.getSortByToggleProps()) } : { ...column.getHeaderProps() }
                                return (
                                    <th {...sortable} >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                {
                    isLoading ?
                        <tbody>
                            <tr>
                                <td colSpan={100} className='text-center'>
                                    <LoadingSpinner className='m-3' />
                                </td>
                            </tr>
                        </tbody> :
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                }
            </table>

            <Row>
                <Col xs="auto">
                    <Pagination>
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    </Pagination>
                </Col>
                <Col xs="auto">
                    <Form.Select defaultValue="15"
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[15, 50, 200, 99999].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </>
    )
})

export const Table = forwardRef((props, ref) => {
    const { columns, data, filter, canSelectRow, isLoading } = props
    return (
        <>
            <CustomTable columns={columns} data={data} filter={filter} canSelectRow={canSelectRow} isLoading={isLoading} ref={ref} />
        </>
    )
})
