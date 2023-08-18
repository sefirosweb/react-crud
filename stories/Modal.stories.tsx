import React, { useState } from 'react';
import { Modal, Props } from '../src/components/forms/Modal';
import { Button } from 'react-bootstrap';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Form/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Template: Story = {
  args: {
    accept: 'Accept button',
    title: 'Title of modal',
    body: 'Body of modal',
    handleAccept: () => {
      console.log('handleAccept');
    },
    onExited: () => {
      console.log('onExited');
    },
    onShow: () => {
      console.log('onShow');
    }
  },

  render: (props) => {
    const [show, setShow] = useState(false);

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
          {...props}
          show={show}
          setShow={setShow}
        />
      </>
    );
  },
}
