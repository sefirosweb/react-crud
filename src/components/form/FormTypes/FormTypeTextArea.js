import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormTypeTextArea = ({
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
                as="textarea"
                rows={3}
                value={value}
                onChange={handleChange}
                name={inputFieldName}
                readOnly={isLoading}
            />
        </Form.Group>
    )
}

FormTypeTextArea.propTypes = {
    inputFieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
}

export default FormTypeTextArea
