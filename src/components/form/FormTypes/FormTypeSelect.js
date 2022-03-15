import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import axiosWithCache from './../../../lib/axiosWithCache'

const FormTypeSelect = ({
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    className,
    selectOptionsUrl,
}) => {
    const [selectOptions, setSelectOptions] = useState([])
    const mounted = useRef(false)
    useEffect(() => {
        mounted.current = true
        return () => (mounted.current = false)
    })

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()
        axiosWithCache
            .get(selectOptionsUrl, {
                cancelToken: cancelTokenSource.token,
            })
            .then((response) => {
                const { data } = response.data
                if (mounted.current) {
                    setSelectOptions(data)
                }
            })

        return () => {
            cancelTokenSource.cancel()
        }
    }, [])

    return (
        <Form.Group controlId={inputFieldName} className={className}>
            {label ? <Form.Label>{label}</Form.Label> : ''}
            <Form.Select
                value={value}
                name={inputFieldName}
                onChange={handleChange}
                disabled={isLoading}
            >
                <option value={''}></option>
                {selectOptions.map((option) => {
                    return (
                        <option
                            key={option.value ? option.value : option}
                            value={option.value ? option.value : option}
                        >
                            {option.name ? option.name : option}
                        </option>
                    )
                })}
            </Form.Select>
        </Form.Group>
    )
}

FormTypeSelect.propTypes = {
    inputFieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    selectOptionsUrl: PropTypes.string.isRequired,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
}

export default FormTypeSelect
