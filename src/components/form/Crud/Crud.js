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
        canSearch = false,
        canRefresh = false,
        canEdit = false,
        canDelete = false,
        canSelectRow = false,
        createButtonTitle = false,
        columns = [],
        crudUrl,
        primaryKey,
        titleOnDelete,
        handleSuccess,
        lazyLoad = false,
        customButtons = '',
        // filters = {},
    } = props

    const newColumns = columns.map((a) => Object.assign({}, a))
    const tableRef = useRef()
    const mounted = useRef(false)
    const firstLoad = useRef(true)
    const [crud, setCrud] = useState('CREATE')
    const [show, setShow] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [modalData, setModalData] = useState({})
    const [modalTitle, setModalTitle] = useState('')
    const [searchField, setSearchField] = useState('')
    const [sendRequest, setSendRequest] = useState(false)
    const [isLoadingTable, setIsLoadingTable] = useState(false)
    const [tempFilters, setTempFilters] = useState({})
    const [inputFilters, setInputFilters] = useState({})

    const handleGlobalSearchField = (e) => setSearchField(e.target.value)

    const handleSearchField = (field, value) => {
        if (!lazyLoad) return
        setIsLoadingTable(true)

        const newFilter = { ...inputFilters }
        newFilter[field] = value
        setTempFilters(newFilter)
    }

    useEffect(() => {
        if (!lazyLoad) return
        setIsLoadingTable(true)

        const newFilter = { ...inputFilters }
        newFilter.global = searchField
        setTempFilters(newFilter)
    }, [searchField])

    useEffect(() => {
        if (!lazyLoad) return
        setIsLoadingTable(true)

        const timer = setTimeout(() => {
            setInputFilters(tempFilters)
        }, 400)
        return () => clearTimeout(timer)
    }, [tempFilters])

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

    newColumns.forEach((c) => {
        if (c.filter) {
            c.Header = (
                <>
                    {c.Header}
                    <Form.Control
                        onChange={(e) => {
                            handleSearchField(c.accessor, e.target.value)
                        }}
                        type="text"
                    />
                </>
            )
        }

        if (canEdit) {
            if (c.type === 'multiselect' && c.editable) {
                const newCell = (row) => {
                    let onExitModalMultiSelectCrud = undefined

                    if (
                        c.onExitModal &&
                        {}.toString.call(c.onExitModal) === '[object Function]'
                    ) {
                        if (c.onExitModalRefresh) {
                            onExitModalMultiSelectCrud = () => {
                                loadTable()
                                c.onExitModal()
                            }
                        } else {
                            onExitModalMultiSelectCrud = () => {
                                c.onExitModal()
                            }
                        }
                    } else if (c.onExitModalRefresh) {
                        onExitModalMultiSelectCrud = () => {
                            loadTable()
                        }
                    }

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
                                onExitModal={onExitModalMultiSelectCrud}
                            />
                        </div>
                    )
                }
                c.Cell = newCell
            }
        }
    })

    if (canEdit) {
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

    const createButton = !createButtonTitle ? (
        ''
    ) : (
        <Button
            crud="CREATE"
            variant="success"
            onClick={() => handleModalShow('CREATE')}
        >
            {createButtonTitle}
        </Button>
    )

    // Get data from backend using axios

    useEffect(() => {
        if (!crudUrl) return
        const cancelTokenSource = axios.CancelToken.source()

        if (lazyLoad) {
            if (firstLoad.current) {
                firstLoad.current = false
                return
            }
        }

        setDataTable([])
        setIsLoadingTable(true)
        axios
            .get(crudUrl, {
                cancelToken: cancelTokenSource.token,
                params: inputFilters,
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
            .then(() => {
                if (mounted.current) {
                    setIsLoadingTable(false)
                }
            })

        return () => {
            cancelTokenSource.cancel()
        }
    }, [sendRequest, crudUrl, inputFilters, lazyLoad])
    const loadTable = () => setSendRequest(!sendRequest)

    useImperativeHandle(ref, () => ({
        refreshTable() {
            loadTable()
        },
        setDataTable,
        setIsLoadingTable,
        tableRef,
    }))

    const handleSuccessModalCrud = (request, crud) => {
        loadTable()

        if (
            handleSuccess &&
            {}.toString.call(handleSuccess) === '[object Function]'
        ) {
            handleSuccess(request, crud)
        }
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col xs={12} md={6} className="mt-3">
                    {createButton}
                    {customButtons}
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
                                onChange={handleGlobalSearchField}
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
                        filter={searchField}
                        canSelectRow={canSelectRow}
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
                handleSuccess={handleSuccessModalCrud}
                primaryKey={primaryKey}
                titleOnDelete={titleOnDelete}
            />
        </div>
    )
})

Crud.displayName = 'Crud'

Crud.propTypes = {
    lazyLoad: PropTypes.bool,
    canSearch: PropTypes.bool,
    canRefresh: PropTypes.bool,
    canEdit: PropTypes.bool,
    // filters: PropTypes.object,
    canDelete: PropTypes.bool,
    canSelectRow: PropTypes.bool,
    titleOnDelete: PropTypes.string,
    primaryKey: PropTypes.string,
    crudUrl: PropTypes.string,
    createButtonTitle: PropTypes.string,
    customButtons: PropTypes.element,
    handleSuccess: PropTypes.func,

    columns: PropTypes.arrayOf(
        PropTypes.shape({
            accessor: PropTypes.string.isRequired,
            Header: PropTypes.string.isRequired,
            titleOnCRUD: PropTypes.string,
            editable: PropTypes.bool,
            sortable: PropTypes.bool,
            visible: PropTypes.bool,
            filter: PropTypes.bool,
            type: PropTypes.oneOf([
                'text',
                'number',
                'date',
                'textarea',
                'password',
                'select',
                'checkbox',
                'multiselect',
            ]),
            selectOptionsUrl: PropTypes.string,
            multiSelectOptionsPrimaryKey: PropTypes.string,
            onExitModal: PropTypes.func,
            onExitModalRefresh: PropTypes.bool,
            multiSelectOptionsColumns: PropTypes.arrayOf(
                PropTypes.shape({
                    accessor: PropTypes.string.isRequired,
                    Header: PropTypes.string.isRequired,
                    editable: PropTypes.bool,
                    visible: PropTypes.bool,
                    type: PropTypes.oneOf([
                        'text',
                        'number',
                        'date',
                        'textarea',
                        'password',
                        'select',
                        'checkbox',
                    ]),
                    selectOptionsUrl: PropTypes.string,
                })
            ),
        })
    ).isRequired,
}

export { Crud }
