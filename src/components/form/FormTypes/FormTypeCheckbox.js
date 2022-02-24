import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const FormTypeCheckbox = ({
    inputFieldName,
    className,
    label,
    isLoading,
    handleChange,
    value,
}) => {
    const checked =
        value === true
            ? true
            : value === 'true'
            ? true
            : value === 1
            ? true
            : value === '1'
            ? true
            : false

    return (
        <Form.Group controlId={inputFieldName} className={className}>
            <Form.Check
                type="switch"
                disabled={isLoading}
                onChange={() => {
                    handleChange({
                        target: {
                            name: inputFieldName,
                            value: checked ? '0' : '1',
                        },
                    })
                }}
                checked={checked}
                label={label}
                name={inputFieldName}
            />
        </Form.Group>
    )
}

FormTypeCheckbox.propTypes = {
    inputFieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
}

export default FormTypeCheckbox
