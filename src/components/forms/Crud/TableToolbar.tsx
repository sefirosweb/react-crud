import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import { RefreshButton } from "../../buttons/RefreshButton";
import { DebouncedInput } from "../Table/DebouncedInput";

type Props = {
  isLoading: boolean;
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
    isLoading,
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
          <Button variant="success" onClick={() => handleModalShow()} disabled={isLoading}>
            {createButtonTitle}
          </Button>
        )}

        {customButtons}
      </Col>

      <Col lg={3} md={4} xs={12} className="mb-3 align-self-end">
        <InputGroup className="d-flex justify-content-end">
          {enableGlobalFilter && (
            <DebouncedInput
              type="text"
              value={filter}
              onChange={(value) => setFilter(String(value))}
              placeholder={`Search...`}
              className="form-control"
              disabled={isLoading}
            />
          )}

          {canRefresh && (
            <RefreshButton
              disabled={isLoading}
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
