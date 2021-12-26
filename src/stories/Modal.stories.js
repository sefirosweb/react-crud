import React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from '../components/form/Modal';
import { Button } from "react-bootstrap";
import useState from 'storybook-addon-state';


const ModalStory = storiesOf('Form/Modal', module);
ModalStory.add('Primary', () => {

    const [show, setShow] = useState("show", false);
    const [isLoading, setIsLoading] = useState("isLoading", false);

    const onExited = () => {
        console.log('onExited')
    }

    const handleAccept = () => {
        setShow(false)
        console.log('handleAccept')
    }

    const bodyFields = (
        <div>
            Body Modal Fields
        </div>
    )

    const onShow = () => {
        console.log('On Show')
    }

    return (
        <>
            <Button onClick={() => { setShow(true) }}>
                Open Modal
            </Button>

            <Modal
                show={show}
                setShow={setShow}
                handleAccept={handleAccept}
                body={bodyFields}
                title={"Modal Title"}
                onExited={onExited}
                isLoading={isLoading}
                accept="Accept Button"
                onShow={onShow}
            />
        </>
    );
});