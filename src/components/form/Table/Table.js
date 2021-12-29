import React from 'react'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { CustomTable } from '../CustomTable'

const Table = forwardRef((props, ref) => {
    const { columns, data, filter, canSelectRow, isLoading } = props
    return (
        <>
            <CustomTable
                columns={columns}
                data={data}
                filter={filter}
                canSelectRow={canSelectRow}
                isLoading={isLoading}
                ref={ref}
            />
        </>
    )
})
Table.displayName = 'Table'

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    isLoading: PropTypes.array,
    canSelectRow: PropTypes.array,
    filter: PropTypes.string,
}

export { Table }
