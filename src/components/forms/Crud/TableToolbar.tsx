import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import { RefreshButton } from "../../buttons/RefreshButton";
import { DebouncedInput } from "../Table/DebouncedInput";

type Props = {
  enableGlobalFilter?: boolean;
  createButtonTitle?: string;
  canRefresh?: boolean;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  refreshTable?: () => void;
  handleModalShow: () => void;
  customButtons?: JSX.Element;
};

export const TableToolbar = (props: Props) => {
  const {
    createButtonTitle,
    enableGlobalFilter,
    setGlobalFilter,
    canRefresh,
    refreshTable,
    handleModalShow,
    customButtons,
  } = props;

  const [filter, setFilter] = useState("");
  useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  return (
    <Row>
      <Col lg={9} md={8} xs={12} className="mb-3">
        {createButtonTitle && (
          <Button variant="success" onClick={() => handleModalShow()}>
            {createButtonTitle}
          </Button>
        )}

        {customButtons}
      </Col>

      <Col lg={3} md={4} xs={12} className="mb-3">
        <InputGroup className="d-flex justify-content-end">
          {enableGlobalFilter && (
            <DebouncedInput
              type="text"
              value={filter}
              onChange={(value) => setFilter(String(value))}
              placeholder={`Search...`}
              className="form-control"
            />
          )}

          {canRefresh && (
            <RefreshButton
              onClick={() => {
                if (typeof refreshTable !== "undefined") {
                  refreshTable();
                }
              }}
            />
          )}
        </InputGroup>
      </Col>
    </Row>
  );
};
