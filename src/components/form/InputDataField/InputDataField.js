import React, {
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    forwardRef,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Col, Form, InputGroup, Button, Row } from 'react-bootstrap'
import getDataMemo from '../../../lib/getDataMemo'
import toastr from 'toastr'

const InputDataField = forwardRef((props, ref) => {
    const {
        data = [],
        limit = 10,
        onAcceptButton,
        handleChangeFilter,
        url,
        isLoading,
    } = props
    const [filter, setFilter] = useState('')
    const [dataField, setDataField] = useState(data)
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true
        return () => (mounted.current = false)
    })

    useImperativeHandle(ref, () => ({
        clear() {
            setFilter('')
        },
    }))

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
        if (
            handleChangeFilter &&
            {}.toString.call(handleChangeFilter) === '[object Function]'
        ) {
            handleChangeFilter(filter)
        }
    }

    const handleOnAcceptButton = () => {
        const dataFound = dataField.find((d) => {
            const valueToFind = d.name ? d.name : d
            return valueToFind == filter
        })

        if (!dataFound) {
            toastr.warning('The selected is not correct')
            return
        }
        if (
            onAcceptButton &&
            {}.toString.call(onAcceptButton) === '[object Function]'
        ) {
            onAcceptButton(dataFound.value ? dataFound.value : dataFound)
        }
    }

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source()
        if (!url) return

        getDataMemo(url, cancelTokenSource).then((request) => {
            if (mounted.current) {
                const responseData = request.data
                const success = request.success
                if (success) {
                    setDataField(responseData)
                }
            }
        })

        return () => {
            cancelTokenSource.cancel()
        }
    }, [url, setDataField])

    const options = () => {
        const items = dataField.filter((i) => {
            const item = i.name ? i.name : item
            return item
                .toString()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .match(
                    filter
                        .toString()
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                )
        })

        if (items.length > limit) {
            items.splice(0, items.length - limit)
        }

        return items.map((item, key) => (
            <option
                key={item.value ? item.value : key}
                value={item.name ? item.name : item}
            />
        ))
    }

    return (
        <>
            <Form>
                <Row className="mt-3">
                    <Col>
                        <InputGroup className="d-flex justify-content-end">
                            <Form.Control
                                list="data"
                                onChange={onChangeFilter}
                                value={filter}
                                placeholder="Buscar"
                                readOnly={isLoading}
                            />
                            <datalist id="data">{options()}</datalist>
                            <Button
                                onClick={handleOnAcceptButton}
                                disabled={isLoading}
                            >
                                Añadir
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </>
    )
})

InputDataField.displayName = 'InputDataField'

InputDataField.propTypes = {
    url: PropTypes.string,
    data: PropTypes.array,
    limit: PropTypes.number,
    isLoading: PropTypes.bool,
    onAcceptButton: PropTypes.func,
    handleChangeFilter: PropTypes.func,
}

export { InputDataField }
