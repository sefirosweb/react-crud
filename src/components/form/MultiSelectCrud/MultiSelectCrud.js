import React, { useRef, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Modal } from './../Modal'
import { Table } from './../Table'
import { InputDataField } from './../InputDataField'
import { EditButton } from './../../buttons/EditButton'
import { DeleteButton } from './../../buttons/DeleteButton'
import { FormTypes } from '../FormTypes'

const MultiSelectCrud = ({ primaryKey, primaryKeyId, crudUrl, columns }) => {
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const InputDataFieldRef = useRef()
    const newColumns = [...columns]

    const [modalData, setModalData] = useState([])

    const refreshModalTable = (request) => {
        const { success } = request.data
        if (success) {
            InputDataFieldRef.current.clear()
            setModalData({})
            loadTableModal()
        } else {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        const newFormData = {
            ...modalData,
        }

        newFormData[fieldName] = fieldValue
        setModalData(newFormData)
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
            .finally(() => setIsLoading(false))
    }

    const handleDelete = (id) => {
        setIsLoading(true)
        axios
            .delete(`${crudUrl}`, { data: { primaryKeyId, id } })
            .then(refreshModalTable)
            .finally(() => setIsLoading(false))
    }

    const onAcceptButton = (dataField) => {
        const modalDataToSend = {}
        inputfields.forEach((f) => {
            modalDataToSend[f.accessor] =
                modalData[f.accessor] !== undefined ? modalData[f.accessor] : ''
        })

        setIsLoading(true)
        axios
            .post(`${crudUrl}`, {
                name: dataField,
                primaryKeyId,
                pivots: modalDataToSend,
            })
            .then(refreshModalTable)
            .catch(() => setIsLoading(false))
    }

    const inputfields = columns.filter(
        (c) => c.editable && c.type !== 'multiselect'
    )
    const fields = inputfields.map((field, key) => {
        return (
            <FormTypes
                className="mt-2"
                type={field.type ? field.type : 'text'}
                key={key}
                inputFieldName={field.accessor}
                label={field.Header}
                isLoading={isLoading}
                handleChange={handleChange}
                value={
                    modalData[field.accessor] ? modalData[field.accessor] : ''
                }
                selectOptionsUrl={
                    field.selectOptionsUrl ? field.selectOptionsUrl : ''
                }
            />
        )
    })

    const body = (
        <>
            <InputDataField
                ref={InputDataFieldRef}
                url={`${crudUrl}/get_array`}
                onAcceptButton={onAcceptButton}
                isLoading={isLoading}
            />
            {fields}
            <Table
                className="mt-2"
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
                onExited={() => setModalData({})}
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
