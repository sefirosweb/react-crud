import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Form } from "react-bootstrap";
import getDataMemo from './../../../lib/getDataMemo';

export const FormTypes = ({ type, inputFieldName, isLoading, label, value, handleChange, selectOptionsUrl, cache, setCache }) => {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    if (type === 'select') {
        const [selectOptions, setSelectOptions] = useState([]);

        useEffect(() => {
            const cancelTokenSource = axios.CancelToken.source();
            getDataMemo(selectOptionsUrl, cancelTokenSource)
                .then(({ data, success }) => {
                    if (mounted.current) {
                        if (success) {
                            setSelectOptions(data)
                        }
                    }
                })
                .catch((error) => console.log(error))

            return () => {
                cancelTokenSource.cancel();
            };
        }, []);

        return (
            <Form.Group controlId={inputFieldName} className='mb-2'>
                <Form.Label>{label}</Form.Label>
                <Form.Select
                    value={value}
                    name={inputFieldName}
                    onChange={handleChange}
                    readOnly={isLoading}
                >
                    <option value={""}></option>
                    {selectOptions.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </Form.Select>
            </Form.Group>
        )
    }

    if (type === 'textarea') {
        return (
            <Form.Group controlId={inputFieldName} className='mb-2'>
                <Form.Label>{label}</Form.Label>
                <Form.Control as="textarea" rows={3}
                    value={value}
                    onChange={handleChange}
                    name={inputFieldName}
                    readOnly={isLoading}
                />
            </Form.Group>
        )
    }

    if (type === 'password' || type === 'text') {
        return (
            <Form.Group controlId={inputFieldName} className='mb-2'>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    readOnly={isLoading}
                    name={inputFieldName}
                    onChange={handleChange}
                    value={value}
                />
            </Form.Group>
        );
    }

    return (
        <Form.Group controlId={inputFieldName}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                readOnly={isLoading}
                name={inputFieldName}
                onChange={handleChange}
                value={value}
            />
        </Form.Group>
    );
};