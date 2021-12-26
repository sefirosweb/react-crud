import { Button, Modal } from "react-bootstrap";
import LoadingButton from "@/components/buttons/LoadingButton";

const CustomModal = ({
    show,
    setShow,
    handleAccept,
    body = "",
    title,
    accept,
    onExited,
    onShow,
    isLoading,
}) => {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={!isLoading}
                onExited={onExited}
                onShow={onShow}
            >
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
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
                        ""
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomModal;