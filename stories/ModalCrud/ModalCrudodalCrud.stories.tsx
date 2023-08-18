import React, { useState } from "react";
import { ModalCrud } from "../../src/components/forms/ModalCrud";
import { Button } from "react-bootstrap";
import { TestColumnsModel } from '../../test/mockData/Product';
import { CrudType } from "../../src/types";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Form/ModalCrud',
  component: ModalCrud,
};

export default meta;

type Story = StoryObj<typeof ModalCrud>;

export const Template: Story = {
  args: {
    fields: TestColumnsModel,
  },

  render: (props) => {
    const { accept, fields } = props;
    const [show, setShow] = useState(false);
    const [crud, setCrud] = useState<CrudType>("CREATE");

    const handleSuccess = (response: any, crud: CrudType) => {
      console.log(response);
      console.log(crud);
    };

    const [acceptButton, setAcceptButton] = useState("Accept");

    return (
      <>
        <p>
          <Button
            variant="success"
            onClick={() => {
              if (!accept) {
                setAcceptButton("Create");
              } else {
                setAcceptButton(accept);
              }

              setCrud("CREATE");
              setShow(true);
            }}
          >
            Create
          </Button>
        </p>
        <p>
          <Button
            variant="warning"
            onClick={() => {
              if (!accept) {
                setAcceptButton("Update");
              } else {
                setAcceptButton(accept);
              }

              setCrud("UPDATE");
              setShow(true);
            }}
          >
            Update
          </Button>
        </p>
        <p>
          <Button
            variant="danger"
            onClick={() => {
              if (!accept) {
                setAcceptButton("Delete");
              } else {
                setAcceptButton(accept);
              }

              setCrud("DELETE");
              setShow(true);

            }}
          >
            Delete
          </Button>
        </p>

        <ModalCrud
          fields={fields}
          show={show}
          setShow={setShow}
          accept={acceptButton}
          crud={crud}
          url={"/api/crud"}
          primaryKey="id"
          handleSuccess={handleSuccess}
          titleOnDelete="name"
          title="Custom Title for CRUD"
        />
      </>
    );
  },
}