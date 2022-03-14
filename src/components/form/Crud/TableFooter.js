import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Pagination, Row } from 'react-bootstrap'

const TableFooter = (props) => {
    const {
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,

        setPageSize,
        pageIndex,
        pageCount,
    } = props

    return (
        <Row>
            <Col xs="auto">
                <Pagination>
                    <Pagination.First
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    />
                    <Pagination.Prev
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    />
                    <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
                    <Pagination.Next
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    />
                    <Pagination.Last
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    />
                </Pagination>
            </Col>
            <Col xs="auto">
                <Form.Select
                    defaultValue="15"
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[15, 50, 200, 99999].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </Form.Select>
            </Col>
        </Row>
    )
}

TableFooter.propTypes = {
    gotoPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    canPreviousPage: PropTypes.bool.isRequired,
    canNextPage: PropTypes.bool.isRequired,

    setPageSize: PropTypes.func.isRequired,
    pageIndex: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
}

export default TableFooter
