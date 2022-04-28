import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
    useRef,
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import { Table } from './../Table'
import { ModalCrud } from './../ModalCrud'

import preloadSelect from './../../../lib/preloadSelect'
import { TableToolbar } from './TableToolbar'
import AddColumns from './helper'

const Crud = forwardRef((props, ref) => {
    const {
        canSearch = false,
        canRefresh = false,
        canEdit = false,
        canDelete = false,
        canSelectRow = false,
        createButtonTitle,
        columns = [],
        crudUrl,
        primaryKey,
        titleOnDelete,
        handleSuccess,
        lazyLoad = false,
        customButtons,
        filters,
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
    }, [searchField, inputFilters, lazyLoad])

    useEffect(() => {
        if (!lazyLoad) return
        setIsLoadingTable(true)

        const timer = setTimeout(() => {
            setInputFilters(tempFilters)
        }, 400)
        return () => clearTimeout(timer)
    }, [tempFilters, lazyLoad])

    useEffect(() => {
        if (!lazyLoad) return
        setIsLoadingTable(true)

        const newFilter = { ...inputFilters, ...filters }
        setTempFilters(newFilter)
    }, [filters, lazyLoad, inputFilters])

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

    const filterCallBack = (accessor, e) => {
        handleSearchField(accessor, e.target.value)
    }

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
            .finally(() => {
                if (mounted.current) {
                    setIsLoadingTable(false)
                }
            })

        return () => {
            cancelTokenSource.cancel()
        }
    }, [sendRequest, crudUrl, inputFilters, lazyLoad, columns])

    const loadTable = () => setSendRequest(!sendRequest)

    useImperativeHandle(ref, () => ({
        refreshTable() {
            loadTable()
        },
        setDataTable,
        setIsLoadingTable,

        inputFilters,
        setInputFilters,

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

    const dataTableMemo = useMemo(() => dataTable, [dataTable])

    const useColumnsMemp = useMemo(
        () =>
            AddColumns(
                newColumns,
                canEdit,
                canDelete,
                handleModalShow,
                primaryKey,
                filterCallBack,
                loadTable
            ),
        [
            canDelete,
            canEdit,
            filterCallBack,
            handleModalShow,
            loadTable,
            newColumns,
            primaryKey,
        ]
    )

    return (
        <div>
            <TableToolbar
                createButtonTitle={createButtonTitle}
                handleModalShow={handleModalShow}
                customButtons={customButtons}
                canSearch={canSearch}
                canRefresh={canRefresh}
                globalFilter={searchField}
                setGlobalFilter={setSearchField}
                loadTable={loadTable}
            />

            <Row className="mt-3">
                <Col>
                    <Table
                        data={dataTableMemo}
                        columns={useColumnsMemp}
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
    filters: PropTypes.object,
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
            canSearch: PropTypes.bool,
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
