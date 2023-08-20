import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, InputGroup, Row } from "react-bootstrap";
import { RefreshButton } from "../../buttons/RefreshButton";
import { DebouncedInput } from "../Table/DebouncedInput";
import { FaFileExport } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import InputSearch from '@sefirosweb/react-multiple-search'
import { EnableGlobalFilterLabels, GlobalFilters } from "../../../types";

type Props = {
  isLoading: boolean;
  enableGlobalFilter?: boolean;
  enableGlobalFilterLabels?: Array<EnableGlobalFilterLabels>;
  createButtonTitle?: string;
  canRefresh?: boolean;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setDynamicFilters: React.Dispatch<React.SetStateAction<Array<GlobalFilters>>>;
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
    enableGlobalFilterLabels,
    setGlobalFilter,
    setDynamicFilters,
    canRefresh,
    refreshTable,
    handleModalShow,
    generateExcel,
    customButtons,
    canExport,
    exportName
  } = props;

  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState<Array<GlobalFilters>>([]);

  useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  useEffect(() => {
    setDynamicFilters(filters);
  }, [filters]);

  const { t } = useTranslation()

  return (
    <Row>
      <Col lg={6} md={6} xs={12} className="mb-3">
        {createButtonTitle && (
          <Button variant="success" onClick={() => handleModalShow()} disabled={isLoading}>
            {createButtonTitle}
          </Button>
        )}

        {customButtons}
      </Col>

      <Col lg={6} md={6} xs={12} className="mb-3 align-self-end">
        <div className="d-flex justify-content-end">

          {enableGlobalFilter && typeof enableGlobalFilterLabels === 'undefined' && (
            <DebouncedInput
              type="text"
              value={filter}
              onChange={(value) => setFilter(String(value))}
              placeholder={t('Search') as string}
              className="form-control"
            />
          )}

          {enableGlobalFilter && enableGlobalFilterLabels && (
            <div className="w-100">
              <InputSearch
                filters={filters}
                setFilters={setFilters}
                filterLabels={enableGlobalFilterLabels}
              />
            </div>
          )}

          {(canRefresh || canExport) && (
            <div>
              <ButtonGroup className="ms-2">
                {canRefresh && (
                  <RefreshButton
                    disabled={isLoading}
                    onClick={() => refreshTable()}
                  />
                )}

                {canExport &&
                  <Button onClick={() => generateExcel(exportName + Date.now())}>
                    <FaFileExport size={18} />
                  </Button>
                }
              </ButtonGroup>
            </div>
          )}

        </div>
      </Col>
    </Row >
  );
};
