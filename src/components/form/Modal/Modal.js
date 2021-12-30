import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal as BootstrapModal } from 'react-bootstrap'
import { LoadingButton } from './../../buttons/LoadingButton'

const Modal = ({
    show,
    setShow,
    handleAccept,
    body = '',
    title,
    accept,
    onExited,
    onShow,
    isLoading,
}) => {
    const handleClose = () => setShow(false)

    return (
        <>
            <BootstrapModal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={!isLoading}
                onExited={onExited}
                onShow={onShow}
            >
                <BootstrapModal.Header>
                    <BootstrapModal.Title>{title}</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>{body}</BootstrapModal.Body>
                <BootstrapModal.Footer>
                    <Button
                        variant="danger"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cerrar
                    </Button>

                    {accept ? (
                        isLoading ? (
                            <LoadingButton disabled />
                        ) : (
                            <Button variant="success" onClick={handleAccept}>
                                {accept}
                            </Button>
                        )
                    ) : (
                        ''
                    )}
                </BootstrapModal.Footer>
            </BootstrapModal>
        </>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    handleAccept: PropTypes.func,
    body: PropTypes.element,
    title: PropTypes.string,
    accept: PropTypes.string,
    onExited: PropTypes.func,
    onShow: PropTypes.func,
    isLoading: PropTypes.bool,
}

export { Modal }
