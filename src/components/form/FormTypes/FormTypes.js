import React from 'react'
import PropTypes from 'prop-types'
import FormTypeText from './FormTypeText'
import FormTypeCheckbox from './FormTypeCheckbox'
import FormTypeTextArea from './FormTypeTextArea'
import FormTypeSelect from './FormTypeSelect'

const FormTypes = ({
    type,
    inputFieldName,
    isLoading,
    label,
    value,
    handleChange,
    selectOptionsUrl,
    className,
}) => {
    if (type === 'select') {
        return (
            <FormTypeSelect
                inputFieldName={inputFieldName}
                className={className}
                label={label}
                isLoading={isLoading}
                handleChange={handleChange}
                value={value}
                selectOptionsUrl={selectOptionsUrl}
            />
        )
    }

    if (type === 'textarea') {
        return (
            <FormTypeTextArea
                inputFieldName={inputFieldName}
                className={className}
                label={label}
                isLoading={isLoading}
                handleChange={handleChange}
                value={value}
            />
        )
    }

    if (type === 'checkbox') {
        return (
            <FormTypeCheckbox
                inputFieldName={inputFieldName}
                className={className}
                label={label}
                isLoading={isLoading}
                handleChange={handleChange}
                value={value}
            />
        )
    }

    if (['password', 'number', 'date'].includes(type)) {
        return (
            <FormTypeText
                inputFieldName={inputFieldName}
                className={className}
                label={label}
                type={type}
                isLoading={isLoading}
                handleChange={handleChange}
                value={value}
            />
        )
    }

    return (
        <FormTypeText
            inputFieldName={inputFieldName}
            className={className}
            label={label}
            type="text"
            isLoading={isLoading}
            handleChange={handleChange}
            value={value}
        />
    )
}

FormTypes.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'number',
        'date',
        'textarea',
        'password',
        'select',
        'checkbox',
    ]).isRequired,
    inputFieldName: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    selectOptionsUrl: PropTypes.string,
    className: PropTypes.string,
}

export { FormTypes }
