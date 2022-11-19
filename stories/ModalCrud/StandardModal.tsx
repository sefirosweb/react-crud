import React, { useState } from "react";
import {
  CrudType,
  ModalCrud,
  ModalData,
  Props,
} from "../../src/module/components/forms/ModalCrud";
import { Button } from "react-bootstrap";
import { Story } from "@storybook/react";
import { generateOptionsValue } from "../../.storybook/dataMock";
import { TestColumnsModel } from "../../models/Product";
import { AxiosResponse } from "axios";

const Template = (props: Props) => {
  const { accept, fields } = props;
  const [show, setShow] = useState(false);

  const [modalData, setModalData] = useState<ModalData>({});
  const [crud, setCrud] = useState<CrudType>("CREATE");

  const handleSuccess = (request: AxiosResponse<any, any>, crud: string) => {
    console.log(request);
    console.log(crud);
  };

  const [acceptButton, setAcceptButton] = useState("Accept");

  return (
    <>
      <p>
        <Button
          variant="success"
          onClick={() => {
            if (accept === "XXX") {
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
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0");
            const yyyy = today.getFullYear();

            const fullDatetoday = yyyy + "-" + mm + "-" + dd;

            if (accept === "XXX") {
              setAcceptButton("Update");
            } else {
              setAcceptButton(accept);
            }

            setCrud("UPDATE");
            setShow(true);
            setModalData({
              id: "5",
              name: "Core I7 10º gen",
              api_key: "·$ADADFTWSEGF%G%Gg45",
              number_type_field: "4412",
              input_text_area: "This is a text area",
              number_type_date: fullDatetoday,
              input_check_option: "true",
              input_select_option: generateOptionsValue()[0]["value"],
            });
          }}
        >
          Update
        </Button>
      </p>
      <p>
        <Button
          variant="danger"
          onClick={() => {
            if (accept === "XXX") {
              setAcceptButton("Delete");
            } else {
              setAcceptButton(accept);
            }

            setCrud("DELETE");
            setShow(true);
            setModalData({
              id: "5",
              name: "Core I7 10º gen",
            });
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
        data={modalData}
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
  accept: "XXX",
  fields: TestColumnsModel,
};
