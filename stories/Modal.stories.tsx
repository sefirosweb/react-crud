import React, { useState } from 'react';
import { Modal, Props } from '../react_components/src/components/forms/Modal';
import { Button } from 'react-bootstrap';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Form/Modal',
  component: Modal,
};

export default meta;

const Template = (props: Props) => {
  const { accept, title, isLoading } = props;
  const [show, setShow] = useState(false);

  const onExited = () => {
    console.log('onExited');
  };

  const handleAccept = () => {
    setShow(false);
    console.log('handleAccept');
  };

  const bodyFields = <div>Body Modal Fields</div>;

  const onShow = () => {
    console.log('On Show');
  };

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Open Modal
      </Button>

      <Modal
        show={show}
        setShow={setShow}
        body={bodyFields}
        title={title}
        onExited={onExited}
        isLoading={isLoading}
        onShow={onShow}
        accept={accept}
        handleAccept={handleAccept}
      />
    </>
  );
};

export const Default: Story<Props> = Template.bind({});
Default.args = {
  accept: 'Accept button',
  title: 'Title of modal',
  isLoading: false,
};
