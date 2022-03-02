import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormTypeText = ({
    type,
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
                type={type}
                readOnly={isLoading}
                name={inputFieldName}
                onChange={handleChange}
                value={value}
            />
        </Form.Group>
    )
}

FormTypeText.propTypes = {
    type: PropTypes.oneOf(['text', 'date', 'password']).isRequired,
    inputFieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
}

export default FormTypeText
