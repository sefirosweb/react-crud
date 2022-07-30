import React from 'react';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import { RefreshButton } from '../../buttons/RefreshButton';
import { DebouncedInput } from '../Table/DebouncedInput';

type Props = {
  enableGlobalFilter?: boolean;
  createButtonTitle?: string;
  globalFilterText: string;
  canRefresh?: boolean;
  setGlobalFilterText: React.Dispatch<React.SetStateAction<string>>;
  loadTable?: Function;
  handleModalShow: Function;
  customButtons?: JSX.Element;
};

export const TableToolbar = (props: Props) => {
  const {
    globalFilterText,
    createButtonTitle,
    enableGlobalFilter,
    setGlobalFilterText,
    canRefresh,
    loadTable,
    handleModalShow,
    customButtons,
  } = props;
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

      <Col lg={3} md={4} xs={12}>
        <InputGroup className="d-flex justify-content-end">
          {enableGlobalFilter && (
            <DebouncedInput
              type="text"
              value={globalFilterText as string}
              onChange={(value) => setGlobalFilterText(String(value))}
              placeholder={`Search...`}
              className="form-control"
            />
          )}

          {canRefresh && (
            <RefreshButton
              onClick={() => {
                if (typeof loadTable !== 'undefined') {
                  loadTable();
                }
              }}
            />
          )}
        </InputGroup>
      </Col>
    </Row>
  );
};
