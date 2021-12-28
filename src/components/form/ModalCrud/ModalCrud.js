import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import { Form } from "react-bootstrap";
import { Modal } from "./../Modal";
import { FormTypes } from "./../FormTypes";

export const ModalCrud = ({
    show,
    setShow,
    title,
    accept, // TODO pending to add default value
    fields,
    url,
    handleSuccess,
    modalData,
    setModalData,
    crud,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        const newFormData = {
            ...modalData,
        };
        newFormData[fieldName] = fieldValue;
        setModalData(newFormData);
    };

    const sendRequest = () => {
        setIsLoading(true);
        const response = (request) => {
            const { data, success } = request.data;
            if (success) {
                setShow(false);
                handleSuccess(request);
            }
        };

        const catchError = (error) => {
            console.log(error);
        };

        const completed = () => {
            setIsLoading(false);
        };

        switch (crud) {
            case "CREATE":
                axios
                    .post(`${url}`, modalData)
                    .then(response)
                    .catch(catchError)
                    .then(completed);
                break;
            case "DELETE":
                axios
                    .delete(`${url}`, { data: modalData })
                    .then(response)
                    .catch(catchError)
                    .then(completed);
                break;
            case "UPDATE":
                axios
                    .put(`${url}`, modalData)
                    .then(response)
                    .catch(catchError)
                    .then(completed);
                break;
            default:
                toastr.warning(
                    "Error on crud",
                    "No selected correct CRUD petitin"
                );
                setIsLoading(false);
        }
    };

    const titleOnCRUD = () => {
        if (crud === "DELETE") {
            const primaryKey = fields.find((field) => field.primaryKey).accessor;
            const titleOnCRUD = fields.find((field) => field.titleOnDelete).accessor;
            return (
                <span>
                    <p>Seguro que quieres el registro: {modalData[primaryKey]}</p>
                    <p>{modalData[titleOnCRUD]}</p>
                </span>
            );
        }
    };

    const onExited = () => setModalData({});

    const bodyFields = () => {
        const primaryKey = fields.find((field) => field.primaryKey).accessor;

        return (
            <Form>
                {fields.map((field, key) => {
                    if (field.accessor === primaryKey)
                        return (
                            <Form.Control
                                key={key}
                                type="hidden"
                                name="primaryKey"
                                value={modalData ? modalData[field.accessor] : ""}
                            />
                        );

                    if (crud == "DELETE") return "";
                    if (field.type == "multiselect") return "";

                    if (field.editable) {
                        return <FormTypes
                            type={field.type ? field.type : 'text'}
                            key={key}
                            inputFieldName={field.accessor}
                            label={field.titleOnCRUD}
                            isLoading={isLoading}
                            handleChange={handleChange}
                            value={modalData[field.accessor] ? modalData[field.accessor] : ""}
                            selectOptionsUrl={field.selectOptionsUrl ? field.selectOptionsUrl : ""}
                        />;
                    }

                    return "";
                })}

                {titleOnCRUD()}
            </Form>
        );
    };
    return (
        <>
            <Modal
                show={show}
                setShow={setShow}
                handleAccept={sendRequest}
                body={bodyFields()}
                title={title}
                onExited={onExited}
                isLoading={isLoading}
                accept="Accept"
            />
        </>
    );
};