import axios from "axios"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { connect } from 'react-redux'
import { Col, Form, InputGroup, Button, Row } from "react-bootstrap"
import { setCache } from '@/actions/cacheAction'

const InputDataField = forwardRef((props, ref) => {
    const { data = [], limit = 10, onAcceptButton, handleChangeFilter, url, isLoading, cache, setCache } = props
    const [filter, setFilter] = useState('')
    const [dataField, setDataField] = useState(data)
    const mounted = useRef(false);

    // Check if component is mounted
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    })

    useImperativeHandle(ref, () => ({
        clear() {
            setFilter('');
        }
    }));

    const onChangeFilter = (e) => {
        setFilter(e.target.value)
        if (handleChangeFilter && {}.toString.call(handleChangeFilter) === '[object Function]') {
            handleChangeFilter(filter)
        }
    }

    const handleOnAcceptButton = () => {
        if (onAcceptButton && {}.toString.call(onAcceptButton) === '[object Function]') {
            onAcceptButton(filter)
        }
    }

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        if (!url) return

        if (cache[url]) {
            setDataField(cache[url])
        } else {
            axios.get(url, { cancelToken: cancelTokenSource.token })
                .then((request) => {
                    if (mounted.current) {
                        const responseData = request.data.data
                        const success = request.data.success
                        if (success) {
                            const result = Object.keys(responseData).map((key) => responseData[key]);
                            setCache(url, result);
                            setDataField(result)
                        }
                    }
                })
        }


        return () => { cancelTokenSource.cancel() }
    }, [url, setDataField])

    const options = () => {
        const items = dataField.filter(item => {
            return item.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                .match(
                    filter.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                )
        })

        if (items.length > limit) {
            items.splice(0, items.length - limit)
        }

        return items.map((item, key) =>
            <option key={key} value={item} />
        )
    }

    return (
        <>
            <Form>
                <Row className='mt-3'>
                    <Col>
                        <InputGroup className='d-flex justify-content-end'>
                            <Form.Control list="data" onChange={onChangeFilter} value={filter} placeholder="Buscar" readOnly={isLoading} />
                            <datalist id="data">
                                {options()}
                            </datalist>
                            <Button onClick={handleOnAcceptButton} disabled={isLoading}>Añadir</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </>
    )
})


const mapStateToProps = (reducers) => {
    const { cacheReducer } = reducers
    const { cache } = cacheReducer
    return { cache }
}

const mapDispatchToProps = {
    setCache
}


export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InputDataField)
