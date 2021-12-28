import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Form } from "react-bootstrap";
import { connect } from 'react-redux'
// import store from './../../../lib/store';
import { setCache } from './../../../lib/cacheAction';
// let cache = store.getState().cacheReducer.cache;


export const FormTypes = ({ type, inputFieldName, isLoading, label, value, handleChange, selectOptionsUrl, cache, setCache }) => {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });


    console.log({ cache })

    if (type === 'select') {
        const [selectOptions, setSelectOptions] = useState([]);

        useEffect(() => {
            const cancelTokenSource = axios.CancelToken.source();

            // if (cache[selectOptionsUrl]) {
            //     setSelectOptions(cache[selectOptionsUrl])
            // } else {

            axios
                .get(selectOptionsUrl, { cancelToken: cancelTokenSource.token })
                .then((request) => {
                    if (mounted.current) {
                        const responseData = request.data.data;
                        const success = request.data.success;
                        if (success) {
                            console.log({ responseData })
                            // setCache(selectOptionsUrl, responseData);
                            setSelectOptions(responseData)
                        }
                    }
                })
                .catch((error) => console.log(error))
            // }
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