/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { DeleteButton } from '../../buttons/DeleteButton'
import { EditButton } from '../../buttons/EditButton'
import FormTypeSelect from '../FormTypes/FormTypeSelect'
import FormTypeText from '../FormTypes/FormTypeText'
import { MultiSelectCrud } from './../MultiSelectCrud'

export default function AddColumns(
    newColumns,
    canEdit,
    canDelete,
    handleModalShow,
    primaryKey,
    filterCallBack,
    loadTable
) {
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

    newColumns.forEach((c) => {
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

        if (c.canSearch === true) {
            c.Filter = ({ column: { id, filterValue, setFilter } }) => {
                if (c.type === 'select') {
                    return (
                        <FormTypeSelect
                            inputFieldName={id}
                            handleChange={(e) => {
                                if (
                                    filterCallBack &&
                                    {}.toString.call(filterCallBack) ===
                                        '[object Function]'
                                ) {
                                    filterCallBack(id, e)
                                }

                                setFilter(e.target.value || undefined)
                            }}
                            value={filterValue || ''}
                            selectOptionsUrl={c.selectOptionsUrl}
                        />
                    )
                }

                return (
                    <FormTypeText
                        inputFieldName={id}
                        handleChange={(e) => {
                            if (
                                filterCallBack &&
                                {}.toString.call(filterCallBack) ===
                                    '[object Function]'
                            ) {
                                filterCallBack(id, e)
                            }

                            setFilter(e.target.value || undefined)
                        }}
                        value={filterValue || ''}
                    />
                )
            }
        }
    })

    return newColumns
}
