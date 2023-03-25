import React, { useState } from "react";
import {
  ModalCrud,
  Props,
} from "../../react_components/src/components/forms/ModalCrud";
import { Button } from "react-bootstrap";
import { Story } from "@storybook/react";
import { TestColumnsModel } from "../../models/Product";
import { CrudType } from "../../react_components/src/types";

const Template = (props: Props) => {
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
};

export const StandardModal: Story<Props> = Template.bind({});
StandardModal.args = {
  accept: undefined,
  fields: TestColumnsModel,
};
