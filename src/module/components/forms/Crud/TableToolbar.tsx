import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import { RefreshButton } from "../../buttons/RefreshButton";
import { DebouncedInput } from "../Table/DebouncedInput";
import { FaFileExport } from 'react-icons/fa';


type Props = {
  isLoading: boolean;
  enableGlobalFilter?: boolean;
  createButtonTitle?: string;
  canRefresh?: boolean;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  refreshTable: () => void;
  generateExcel: (fileName: string) => Promise<void>;
  handleModalShow: () => void;
  customButtons?: JSX.Element;
  canExport: boolean;
  exportName: string;
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
    generateExcel,
    customButtons,
    canExport,
    exportName
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
        <div className="d-flex justify-content-end">
          <InputGroup>
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
                disabled={isLoading}
                onClick={() => refreshTable()}
              />
            )}

          </InputGroup>

          {canExport &&
            <Button className="ms-2 d-flex justify-content-center align-items-center"
              onClick={() => generateExcel(exportName + Date.now())}
            >
              <FaFileExport />
            </Button>
          }
        </div>
      </Col>
    </Row >
  );
};
