import { Table } from '@tanstack/react-table';
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type Props = {
  table: Table<any>;
};

export const TableFooter = (props: Props) => {
  const storage = window.location.href + '_getSizeTable';
  const pageSize = parseInt(localStorage.getItem(storage) ?? '15');
  const { t } = useTranslation()

  const { table } = props;
  return (
    <>
      <Row>
        <Col xs="auto">
          <Pagination>
            <Pagination.First
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
            <Pagination.Prev
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <Pagination.Item active>
              {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
              {table.getPageCount() === 0 ? 1 : table.getPageCount()}
            </Pagination.Item>
            <Pagination.Next
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
            <Pagination.Last
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            />
          </Pagination>
        </Col>
        <Col xs="auto">
          <Form.Select
            value={pageSize}
            onChange={(e) => {
              localStorage.setItem(storage, e.target.value);
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[15, 50, 200, 99999].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {t('Show')} {pageSize}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};
