import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import {
  Table,
  Props as TableProps,
  PropsRef as TablePropsRef,
} from "../Table";
import axios, { AxiosResponse } from "axios";
import {
  ColumnFiltersState,
  Table as TableReactTable,
} from "@tanstack/react-table";
import { TableToolbar } from "./TableToolbar";
import { CrudType } from "../../../types";

import {
  HandleModalShow,
  PropsRef as HandleModalShowPropsRef,
} from "./HandleModalShow";
import NewColumns from "./NewColumns";

type newInputFilters = Record<string, unknown>;
export interface Props
  extends Omit<
    TableProps,
    "globalFilterText" | "isLoading" | "setColumnFiltersFields" | "data"
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
  handleSuccess?: (request: AxiosResponse<any, any>, crud: CrudType) => void;
  primaryKey: string;
  titleOnDelete?: string;
  customButtons?: JSX.Element;
}

export type PropsRef = {
  refreshTable: () => void;
  table: TableReactTable<any> | undefined;
  getSelectedRows: <T>() => Array<T>;
  getselectedIds: () => Array<string>;
  lazyFilters: newInputFilters;
  setLazyilters: React.Dispatch<React.SetStateAction<newInputFilters>>;
  setIsLoading: (isLoading: boolean) => void;
};

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
  const [globalFilterText, setGlobalFilterText] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [externalFilters, setExternalFilters] = useState<newInputFilters>({});
  const mounted = useRef(false);
  const firstLoad = useRef(true);
  const tableRef = useRef<TablePropsRef>(null);
  const handleModalShowRef = useRef<HandleModalShowPropsRef>(null);

  const refreshTable = () => setSendRequest(!sendRequest);

  useImperativeHandle(ref, () => ({
    lazyFilters: externalFilters,
    setLazyilters: setExternalFilters,
    refreshTable,
    table: tableRef.current?.table,
    setIsLoading: (isLoading) => {
      setIsLoading(isLoading);
    },
    getSelectedRows: (): Array<any> => {
      if (!tableRef.current) return [];
      return tableRef.current.table
        .getSelectedRowModel()
        .flatRows.map((f) => f.original);
    },

    getselectedIds: (): Array<string> => {
      if (!tableRef.current) return [];
      return Object.keys(tableRef.current.table.getState().rowSelection);
    },
  }));

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!lazyLoad) return;

    const reactTableFilters: newInputFilters = {
      globalFilter: globalFilterText,
    };

    columnFilters.forEach((columnFilter) => {
      reactTableFilters[columnFilter.id] = columnFilter.value;
    });

    setReactTableFilters(reactTableFilters);
  }, [globalFilter, columnFilters, lazyLoad]);

  useEffect(() => {
    if (lazyLoad) return;
    setGlobalFilterText(globalFilter);
  }, [globalFilter]);

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

  const newColumns = NewColumns({
    columns,
    canEdit,
    canDelete,
    canSelectRow,
    handleModalShowRef: handleModalShowRef,
    primaryKey,
    refreshTable,
  });

  return (
    <>
      <div className={className}>
        <TableToolbar
          enableGlobalFilter={enableGlobalFilter}
          setGlobalFilter={setGlobalFilter}
          createButtonTitle={createButtonTitle}
          canRefresh={canRefresh}
          refreshTable={refreshTable}
          customButtons={customButtons}
          handleModalShow={() =>
            handleModalShowRef.current?.handleModalShow("CREATE")
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
              columnFiltersFields={columnFilters}
              setColumnFiltersFields={setColumnFilters}
              enableColumnFilters={!lazyLoad}
            />
          </Col>
        </Row>
      </div>

      <HandleModalShow
        columns={columns}
        url={crudUrl ?? ""}
        dataTable={dataTable}
        primaryKey={primaryKey}
        titleOnDelete={titleOnDelete}
        refreshTable={refreshTable}
        handleSuccess={handleSuccess}
        ref={handleModalShowRef}
      />
    </>
  );
});
