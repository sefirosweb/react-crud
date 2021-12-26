import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from '../components/form/Modal';
import { Button } from "react-bootstrap";

// const [show, setShow] = useState(false);

const ModalStory = storiesOf('Form/Modal', module);
ModalStory.add('Primary', () => {
    return (
        <div>
            <Button>
                Open Modal
            </Button>

            <Modal
                show={true}
                setShow={() => { }}
                // // fields={columns}
                title={"Modal Title"}
                modalData={"modalData"}
            // setModalData={setModalData}
            // crud={crud}
            // url={options.crudUrl}
            // handleSuccess={loadTable}
            />
        </div>
    );
});
