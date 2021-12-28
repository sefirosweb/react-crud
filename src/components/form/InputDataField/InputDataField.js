import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"
import axios from "axios"
import { Col, Form, InputGroup, Button, Row } from "react-bootstrap"
import getDataMemo from "../../../lib/getDataMemo"

export const InputDataField = forwardRef((props, ref) => {
    const { data = [], limit = 10, onAcceptButton, handleChangeFilter, url, isLoading } = props
    const [filter, setFilter] = useState('')
    const [dataField, setDataField] = useState(data)
    const mounted = useRef(false);

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

        getDataMemo(url, cancelTokenSource)
            .then((request) => {
                if (mounted.current) {
                    const responseData = request.data
                    const success = request.success
                    if (success) {
                        setDataField(responseData)
                    }
                }
            })

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