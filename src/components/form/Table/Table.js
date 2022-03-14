import React from 'react'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { CustomTable } from '../CustomTable'

const Table = forwardRef((props, ref) => {
    const { columns, data, filter, canSelectRow, isLoading, className } = props
    return (
        <>
            <CustomTable
                columns={columns}
                data={data}
                filter={filter}
                canSelectRow={canSelectRow}
                isLoading={isLoading}
                className={className}
                ref={ref}
            />
        </>
    )
})
Table.displayName = 'Table'

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    canSelectRow: PropTypes.bool,
    canSearch: PropTypes.object,
    className: PropTypes.string,
    filter: PropTypes.string,
}

export { Table }
