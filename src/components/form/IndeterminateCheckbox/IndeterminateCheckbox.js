import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const indeterminateCheckboxFunction = ({ indeterminate, ...rest }, ref) => {
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

const IndeterminateCheckbox = React.forwardRef(indeterminateCheckboxFunction)
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'

indeterminateCheckboxFunction.PropTypes = {
    indeterminate: PropTypes.object,
    getToggleAllRowsSelectedProps: PropTypes.func,
}

export { IndeterminateCheckbox }
