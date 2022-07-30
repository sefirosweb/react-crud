import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  Table,
  Props as TableProps,
  PropsRef as TablePropsRef,
} from '../Table';
import { IndeterminateCheckbox } from '../Table/IndeterminateCheckbox';
import axios from 'axios';
import {
  ColumnFiltersState,
  Row as RowTanStack,
  Table as TableReactTable,
} from '@tanstack/react-table';
import { TableToolbar } from './TableToolbar';
import { EditButton } from '../../buttons/EditButton';
import { DeleteButton } from '../../buttons/DeleteButton';
import { FieldTypes } from '../../../types/FieldTypes';
import { ShowMultiSelectCrud } from './ShowMultiSelectCrud';
import {
  HandleModalShow,
  PropsRef as HandleModalShowPropsRef,
} from './HandleModalShow';

export interface Props
  extends Omit<
    TableProps,
    'globalFilterText' | 'isLoading' | 'setColumnFiltersFields' | 'data'
  > {
  data?: Array<any>;
  canSelectRow?: boolean;
  enableGlobalFilter?: boolean;
  crudUrl?: string;
  lazyLoad?: boolean;
  createButtonTitle?: string;
  canRefresh?: boolean;
  canDelete?: boolean;
  canEdit?: boolean;
  handleSuccess?: Function;
  primaryKey: string;
  titleOnDelete?: string;
  customButtons?: JSX.Element;
}

export type PropsRef = {
  loadTable: Function;
  table: TableReactTable<any> | undefined;
  getSelectedRows: Function;
  getselectedIds: Function;
  lazyFilters: newInputFilters;
  setLazyilters: React.Dispatch<React.SetStateAction<newInputFilters>>;
};

interface newInputFilters {
  [key: string]: unknown;
}

export const Crud = forwardRef((props: Props, ref: Ref<PropsRef>) => {
  const {
    enableGlobalFilter,
    canSelectRow,
    columns,
    data = [],
    className,
    crudUrl,
    lazyLoad,
    createButtonTitle,
    canRefresh,
    canDelete,
    canEdit,
    handleSuccess,
    primaryKey,
    titleOnDelete,
    customButtons,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState(data);
  const [reactTableFilters, setReactTableFilters] = useState({});
  const [inputFilters, setInputFilters] = useState({});
  const [globalFilterText, setGlobalFilterText] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [externalFilters, setExternalFilters] = useState<newInputFilters>({});
  const mounted = useRef(false);
  const firstLoad = useRef(true);
  const tableRef = useRef<TablePropsRef>(null);
  const handleModalShowRef = useRef<HandleModalShowPropsRef>(null);

  const loadTable = () => setSendRequest(!sendRequest);

  useImperativeHandle(ref, () => ({
    lazyFilters: externalFilters,
    setLazyilters: setExternalFilters,
    loadTable,
    table: tableRef.current?.table,
    getSelectedRows: () => {
      if (!tableRef.current) return [];
      return tableRef.current.table
        .getSelectedRowModel()
        .flatRows.map((c: RowTanStack<any>) =>
          c.getAllCells().reduce((b, i) => {
            const newData: newInputFilters = {
              ...b,
            };
            newData[i.column.id] = i.getValue();
            return newData;
          }, {})
        );
    },

    getselectedIds: () => {
      if (!tableRef.current) return [];
      return Object.keys(tableRef.current.table.getState().rowSelection);
    },
  }));

  const newColumns = [...columns];

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    if (!lazyLoad) return;

    const reactTableFilters: newInputFilters = {
      globalFilter: globalFilterText,
    };

    columnFilters.forEach((columnFilter) => {
      reactTableFilters[columnFilter.id] = columnFilter.value;
    });

    setReactTableFilters(reactTableFilters);
  }, [globalFilterText, columnFilters, lazyLoad]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstLoad.current) {
        firstLoad.current = false;
        return;
      }
      const newExternalFilters = {
        ...externalFilters,
        ...reactTableFilters,
      };
      setInputFilters(newExternalFilters);
    }, 400);
    return () => clearTimeout(timer);
  }, [externalFilters, reactTableFilters]);

  useEffect(() => {
    if (!crudUrl) return;

    const cancelTokenSource = axios.CancelToken.source();

    setDataTable([]);
    setIsLoading(true);
    axios
      .get(crudUrl, {
        cancelToken: cancelTokenSource.token,
        params: inputFilters,
      })
      .then((request) => {
        if (!mounted.current) return;

        const responseData = request.data.data;
        const success = request.data.success;
        if (success) {
          const result = Object.keys(responseData).map(
            (key) => responseData[key]
          );
          setDataTable(result);
        }
      })
      .finally(() => {
        if (!mounted.current) return;
        setIsLoading(false);
      });

    return () => {
      cancelTokenSource.cancel();
    };
  }, [crudUrl, inputFilters, sendRequest]);

  if (canSelectRow === true) {
    newColumns.unshift({
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    });
  }

  if (canEdit) {
    newColumns.push({
      header: 'Edit',
      id: 'edit_crud',
      cell: (row) => {
        return (
          <EditButton
            onClick={() => {
              handleModalShowRef.current?.handleModalShow(
                'UPDATE',
                parseInt(row.cell.row.id)
              );
            }}
          />
        );
      },
    });
  }

  if (canDelete) {
    newColumns.push({
      header: 'Delete',
      id: 'edit_crid',
      editable: false,
      cell: (row) => {
        return (
          <DeleteButton
            onClick={() =>
              handleModalShowRef.current?.handleModalShow(
                'DELETE',
                parseInt(row.cell.row.id)
              )
            }
          />
        );
      },
    });
  }

  if (canEdit) {
    newColumns.forEach((c) => {
      if (c.fieldType === FieldTypes.MULTISELECT && c.editable) {
        c.cell = (props) => {
          const onExitModal = () => {
            if (props.column.columnDef.meta?.multiSelectOptions?.onExitModal) {
              props.column.columnDef.meta.multiSelectOptions.onExitModal();
            }

            if (
              props.column.columnDef.meta?.multiSelectOptions
                ?.onExitModalRefresh
            ) {
              loadTable();
            }
          };

          return (
            <ShowMultiSelectCrud
              crudUrl={
                props.column.columnDef.meta?.multiSelectOptions?.url ?? ''
              }
              getDataUrl={
                props.column.columnDef.meta?.multiSelectOptions?.getDataUrl ??
                ''
              }
              primaryKey={
                props.column.columnDef.meta?.multiSelectOptions?.primaryKey ??
                ''
              }
              primaryKeyId={props.cell.row.original[primaryKey]}
              columns={
                props.column.columnDef.meta?.multiSelectOptions?.columns ?? []
              }
              title={props.column.columnDef.meta?.multiSelectOptions?.title}
              onExitModal={onExitModal}
              lazyLoad={
                props.column.columnDef.meta?.multiSelectOptions?.lazyLoad
              }
            />
          );
        };
      }
    });
  }

  return (
    <>
      <div className={className}>
        <TableToolbar
          globalFilterText={globalFilterText}
          enableGlobalFilter={enableGlobalFilter}
          setGlobalFilterText={setGlobalFilterText}
          createButtonTitle={createButtonTitle}
          canRefresh={canRefresh}
          loadTable={loadTable}
          customButtons={customButtons}
          handleModalShow={() =>
            handleModalShowRef.current?.handleModalShow('CREATE')
          }
        />
        <Row>
          <Col>
            <Table
              columns={newColumns}
              data={dataTable}
              ref={tableRef}
              isLoading={isLoading}
              globalFilterText={globalFilterText}
              setColumnFiltersFields={setColumnFilters}
            />
          </Col>
        </Row>
      </div>

      <HandleModalShow
        columns={columns}
        url={crudUrl ?? ''}
        dataTable={dataTable}
        primaryKey={primaryKey}
        titleOnDelete={titleOnDelete}
        loadTable={loadTable}
        handleSuccess={handleSuccess}
        ref={handleModalShowRef}
      />
    </>
  );
});
