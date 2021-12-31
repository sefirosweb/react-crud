import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap'

import { Table } from './../Table'
import { ModalCrud } from './../ModalCrud'
import { MultiSelectCrud } from './../MultiSelectCrud'

import { EditButton } from './../../buttons/EditButton'
import { DeleteButton } from './../../buttons/DeleteButton'
import { RefreshButton } from './../../buttons/RefreshButton'

import preloadSelect from './../../../lib/preloadSelect'

const Crud = forwardRef((props, ref) => {
    const {
        options = {}, // Pending to check still exist old propieties
        canSearch = false,
        canRefresh = false,
        canEdit = false,
        canDelete = false,
        createButtonTitle = false,
        columns = [],
        crudUrl,
        primaryKey,
        titleOnDelete,
    } = props

    const newColumns = [...columns]
    const tableRef = useRef()
    const mounted = useRef(false)
    const [crud, setCrud] = useState('CREATE')
    const [show, setShow] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [modalData, setModalData] = useState({})
    const [modalTitle, setModalTitle] = useState('')
    const [searchField, setSearchField] = useState('')
    const [sendRequest, setSendRequest] = useState(false)
    const [isLoadingTable, setIsLoadingTable] = useState(false)

    const handleSearchField = (e) => setSearchField(e.target.value)

    useEffect(() => {
        mounted.current = true
        return () => (mounted.current = false)
    })

    const handleModalShow = (type, key) => {
        const titleOnCRUD = columns.find(
            (column) => column.titleOnCRUD
        ).accessor

        const fieldsCanBeEdit = columns
            .filter((column) => column.editable)
            .map((column) => column.accessor)

        let findDataCanBeEdit = {}
        let findData = {}
        if (type !== 'CREATE') {
            findDataCanBeEdit = Object.keys(dataTable[key]).reduce(
                (returnData, column) => {
                    if (
                        fieldsCanBeEdit.includes(column) ||
                        column === primaryKey
                    ) {
                        returnData[column] = dataTable[key][column]
                    }
                    return returnData
                },
                {}
            )
        }

        setCrud(type)
        setModalData(findDataCanBeEdit)
        setModalTitle(
            `${type} ${findData[titleOnCRUD] ? findData[titleOnCRUD] : ''}`
        )

        setShow(true)
    }

    // Add extra buttons depending of options
    if (canEdit) {
        newColumns.forEach((c) => {
            if (c.type === 'multiselect' && c.editable) {
                const newCell = (row) => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            <MultiSelectCrud
                                primaryKeyId={row.cell.row.original[primaryKey]}
                                primaryKey={
                                    row.cell.column.multiSelectOptionsPrimaryKey
                                }
                                crudUrl={row.cell.column.multiSelectOptionsUrl}
                                columns={
                                    row.cell.column.multiSelectOptionsColumns
                                }
                            />
                        </div>
                    )
                }
                c.Cell = newCell
            }
        })

        newColumns.push({
            Header: () => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {canEdit === true ? 'Edit' : canEdit}
                    </div>
                )
            },
            accessor: 'Edit',
            editable: false,
            Cell: (row) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <EditButton
                            onClick={() =>
                                handleModalShow('UPDATE', row.cell.row.id)
                            }
                        />
                    </div>
                )
            },
        })
    }

    if (canDelete) {
        newColumns.push({
            Header: () => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {canDelete === true ? 'Delete' : canDelete}
                    </div>
                )
            },
            accessor: 'Delete',
            editable: false,
            Cell: (row) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <DeleteButton
                            onClick={() =>
                                handleModalShow('DELETE', row.cell.row.id)
                            }
                        />
                    </div>
                )
            },
        })
    }

    const createButton = () => {
        if (createButtonTitle) {
            return (
                <Button
                    crud="CREATE"
                    variant="success"
                    onClick={() => handleModalShow('CREATE')}
                >
                    {createButtonTitle}
                </Button>
            )
        }
        return ''
    }

    const loadCustomButtons = () => {
        if (options.customButtons) {
            return options.customButtons
        }
        return ''
    }

    // Get data from backend using axios

    useEffect(() => {
        if (!crudUrl) return
        const cancelTokenSource = axios.CancelToken.source()
        setDataTable([])
        setIsLoadingTable(true)
        axios
            .get(crudUrl, {
                cancelToken: cancelTokenSource.token,
                params: options.filters,
            })
            .then((request) => {
                if (mounted.current) {
                    const responseData = request.data.data
                    const success = request.data.success
                    if (success) {
                        const result = Object.keys(responseData).map(
                            (key) => responseData[key]
                        )
                        setDataTable(result)
                        preloadSelect(columns)
                    }
                }
            })
            .catch((error) => console.log(error))
            .then(() => setIsLoadingTable(false))

        return () => {
            cancelTokenSource.cancel()
        }
    }, [sendRequest, crudUrl, options.filters])
    const loadTable = () => setSendRequest(!sendRequest)

    useImperativeHandle(ref, () => ({
        refreshTable() {
            loadTable()
        },
        setDataTable,
        setIsLoadingTable,
        tableRef,
    }))

    return (
        <div>
            <Row className="align-items-center">
                <Col xs={12} md={6} className="mt-3">
                    {createButton()}
                    {loadCustomButtons()}
                </Col>

                <Col
                    xs={12}
                    md={6}
                    lg={{ span: 3, offset: 3 }}
                    className="mt-3"
                >
                    <InputGroup className="d-flex justify-content-end">
                        {canSearch ? (
                            <Form.Control
                                onChange={handleSearchField}
                                value={searchField}
                                placeholder="Buscar"
                            />
                        ) : (
                            ''
                        )}

                        {canRefresh ? (
                            <RefreshButton onClick={loadTable} />
                        ) : (
                            ''
                        )}
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Table
                        data={dataTable}
                        columns={newColumns}
                        isLoading={isLoadingTable}
                        defaultSort={options.defaultSort}
                        defaultSortOrder={options.defaultSortOrder}
                        filter={searchField}
                        canSelectRow={options.canSelectRow}
                        ref={tableRef}
                    />
                </Col>
            </Row>

            <ModalCrud
                show={show}
                setShow={setShow}
                fields={columns}
                title={modalTitle}
                modalData={modalData}
                setModalData={setModalData}
                crud={crud}
                url={crudUrl}
                handleSuccess={loadTable}
                primaryKey={primaryKey}
                titleOnDelete={titleOnDelete}
            />
        </div>
    )
})

Crud.displayName = 'Crud'

Crud.propTypes = {
    canSearch: PropTypes.bool,
    canRefresh: PropTypes.bool,
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    titleOnDelete: PropTypes.string,
    primaryKey: PropTypes.string,
    crudUrl: PropTypes.string,
    createButtonTitle: PropTypes.string,

    columns: PropTypes.arrayOf(
        PropTypes.shape({
            accessor: PropTypes.string.isRequired,
            Header: PropTypes.string.isRequired,
            titleOnCRUD: PropTypes.string,
            editable: PropTypes.bool,
            sortable: PropTypes.bool,
            visible: PropTypes.bool,
            type: PropTypes.oneOf([
                'text',
                'textarea',
                'password',
                'select',
                'multiselect',
            ]),
            selectOptionsUrl: PropTypes.string,
            multiSelectOptionsPrimaryKey: PropTypes.string,
            multiSelectOptionsColumns: PropTypes.arrayOf(
                PropTypes.shape({
                    accessor: PropTypes.string.isRequired,
                    Header: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,

    options: PropTypes.object, // TODO pending to delete
}

export { Crud }
