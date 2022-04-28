import React, { forwardRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const IndeterminateCheckboxFunction = ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
    )
}

const IndeterminateCheckbox = forwardRef(IndeterminateCheckboxFunction)
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'

IndeterminateCheckboxFunction.propTypes = {
    indeterminate: PropTypes.object,
    getToggleAllRowsSelectedProps: PropTypes.func,
}

export { IndeterminateCheckbox }
