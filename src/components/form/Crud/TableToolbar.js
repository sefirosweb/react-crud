import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { RefreshButton } from './../../buttons/RefreshButton'

const TableToolbar = (props) => {
    const {
        handleModalShow,
        loadTable,
        globalFilter,
        setGlobalFilter,

        customButtons,
        canSearch = false,
        canRefresh = false,
        createButtonTitle = '',
    } = props

    return (
        <Row className="align-items-center">
            <Col xs={12} md={6}>
                {createButtonTitle === '' ? (
                    ''
                ) : (
                    <Button
                        crud="CREATE"
                        variant="success"
                        onClick={() => handleModalShow('CREATE')}
                    >
                        {createButtonTitle}
                    </Button>
                )}
                {customButtons}
            </Col>

            <Col xs={12} md={6} lg={{ span: 3, offset: 3 }} className="mt-3">
                <InputGroup className="d-flex justify-content-end">
                    {!canSearch ? (
                        ''
                    ) : (
                        <Form.Control
                            placeholder="Buscar"
                            value={globalFilter || ''}
                            onChange={(e) => {
                                setGlobalFilter(e.target.value || '')
                            }}
                        />
                    )}

                    {!canRefresh ? '' : <RefreshButton onClick={loadTable} />}
                </InputGroup>
            </Col>
        </Row>
    )
}

TableToolbar.displayName = 'TableToolbar'

TableToolbar.propTypes = {
    handleModalShow: PropTypes.func.isRequired,
    loadTable: PropTypes.func.isRequired,
    globalFilter: PropTypes.string.isRequired,
    setGlobalFilter: PropTypes.func.isRequired,

    customButtons: PropTypes.element,
    canSearch: PropTypes.bool,
    canRefresh: PropTypes.bool,
    createButtonTitle: PropTypes.string,
}

export { TableToolbar }
