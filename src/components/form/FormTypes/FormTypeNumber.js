import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormTypeNumber = ({
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    className,
}) => {
    return (
        <Form.Group controlId={inputFieldName} className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="number"
                readOnly={isLoading}
                name={inputFieldName}
                onChange={handleChange}
                value={value}
            />
        </Form.Group>
    )
}

FormTypeNumber.propTypes = {
    inputFieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
}

export default FormTypeNumber
