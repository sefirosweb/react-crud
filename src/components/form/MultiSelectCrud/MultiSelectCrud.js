import React, { useRef, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Modal } from './../Modal'
import { Table } from './../Table'
import { InputDataField } from './../InputDataField'
import { EditButton } from './../../buttons/EditButton'
import { DeleteButton } from './../../buttons/DeleteButton'

const MultiSelectCrud = ({ primaryKey, primaryKeyId, crudUrl, columns }) => {
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const InputDataFieldRef = useRef()
    const newColumns = [...columns]

    const refreshModalTable = (request) => {
        const { success } = request.data
        if (success) {
            InputDataFieldRef.current.clear()
            loadTableModal()
        } else {
            setIsLoading(false)
        }
    }

    newColumns.push({
        Header: 'Borrar',
        accessor: 'delete_crud',
        Cell: (row) => (
            <DeleteButton
                disabled={isLoading}
                onClick={() => handleDelete(row.cell.row.original[primaryKey])}
            />
        ),
    })

    const loadTableModal = () => {
        setDataModal([])
        setIsLoading(true)
        axios
            .get(`${crudUrl}`, { params: { primaryKeyId } })
            .then((request) => {
                const responseData = request.data.data
                const success = request.data.success
                if (success) {
                    setDataModal(responseData)
                }
            })
            .catch((error) => console.log(error))
            .then(() => setIsLoading(false))
    }

    const handleDelete = (id) => {
        setIsLoading(true)
        axios
            .delete(`${crudUrl}`, { data: { primaryKeyId, id } })
            .then(refreshModalTable)
            .catch(() => setIsLoading(false))
    }

    const onAcceptButton = (dataField) => {
        setIsLoading(true)
        axios
            .post(`${crudUrl}`, { name: dataField, primaryKeyId })
            .then(refreshModalTable)
            .catch(() => setIsLoading(false))
    }

    const body = (
        <>
            <InputDataField
                ref={InputDataFieldRef}
                url={`${crudUrl}/get_array`}
                onAcceptButton={onAcceptButton}
                isLoading={isLoading}
            />
            <Table
                className="mt-3"
                columns={newColumns}
                data={dataModal}
                isLoading={isLoading}
            />
        </>
    )

    return (
        <>
            <EditButton onClick={() => setShow(true)} />
            <Modal
                show={show}
                setShow={setShow}
                onShow={loadTableModal}
                title="Titulo"
                body={body}
                isLoading={isLoading}
            />
        </>
    )
}

MultiSelectCrud.propTypes = {
    primaryKey: PropTypes.string.isRequired,
    primaryKeyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    crudUrl: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
}

export { MultiSelectCrud }
