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
import {
  ColumnFiltersState,
  Row as RowTanstack,
  Table as TableReactTable,
} from "@tanstack/react-table";
import { QueryClient, QueryClientProvider, QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query'

import { TableToolbar } from "./TableToolbar";
import { CrudType, InputFilter } from "../../../types";

import {
  HandleModalShow,
  PropsRef as HandleModalShowPropsRef,
} from "./HandleModalShow";
import NewColumns from "./NewColumns";
import exportToExcel from "../../../lib/exportToExcel";
import { getRequestData } from "../../../api/crudDataTable";

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
  canExport?: boolean;
  exportName?: string;
  handleSuccess?: (response: any, crud: CrudType) => void;
  primaryKey: string;
  titleOnDelete?: string;
  customButtons?: JSX.Element;
}

export type PropsRef = {
  table: TableReactTable<any> | undefined;
  data: Array<any>;
  setData: (data: Array<any>) => void
  refreshTable: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<any, any>> | undefined;
  getSelectedRows: <T>() => Array<T>;
  getselectedIds: () => Array<string>;
  lazyFilters: InputFilter;
  setLazyilters: React.Dispatch<React.SetStateAction<InputFilter>>;
  setIsLoading: (isLoading: boolean) => void;
  getRowStyles?: (row: RowTanstack<any>) => React.CSSProperties;
  getRowClass?: (row: RowTanstack<any>) => string;
  exportToExcel: (fileName: string) => Promise<void>;
};

const CrudTable = forwardRef((props: Props, ref: Ref<PropsRef>) => {
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
    canExport,
    exportName,
    handleSuccess,
    primaryKey,
    titleOnDelete,
    customButtons,
    getRowStyles,
    getRowClass
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState(data);
  const [reactTableFilters, setReactTableFilters] = useState<InputFilter>({});
  const [inputFilters, setInputFilters] = useState({});
  const [globalFilterText, setGlobalFilterText] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [externalFilters, setExternalFilters] = useState<InputFilter>({});
  const mounted = useRef(false);
  const firstLoad = useRef(true);
  const tableRef = useRef<TablePropsRef>(null);
  const handleModalShowRef = useRef<HandleModalShowPropsRef>(null);

  const { data: dataQuery, isFetching: isFetchingQuery, refetch } = useQuery<any>({
    queryKey: [crudUrl],
    queryFn: () => getRequestData(crudUrl, inputFilters),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false
  })

  useEffect(() => {
    setIsLoading(isFetchingQuery)
  }, [isFetchingQuery])

  useEffect(() => {
    if (!dataQuery) return
    if (!dataQuery.success) return
    const result = Object.keys(dataQuery.data).map((key) => dataQuery.data[key]);
    setDataTable(result);
  }, [dataQuery])

  const refreshTable = () => refetch()
  const generateExcel = (fileName: string) => {
    const data: Array<Record<string, any>> = []

    tableRef.current?.table.getCoreRowModel().rows.forEach(row => {
      const tempRowData: Record<string, any> = {}
      row.getVisibleCells().forEach((cell) => {
        tempRowData[cell.column.id] = cell.getValue()
      })
      data.push(tempRowData)
    })

    return exportToExcel(data, fileName)
  }

  useImperativeHandle(ref, () => ({
    table: tableRef.current?.table,
    data: dataTable,
    setData: setDataTable,
    lazyFilters: externalFilters,
    setLazyilters: setExternalFilters,
    refreshTable: () => {
      if (crudUrl) {
        return refetch()
      }
    },
    setIsLoading,
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

    exportToExcel: generateExcel
  }));

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!lazyLoad) return;
    const reactTableFilters: InputFilter = {};
    if (globalFilter !== "") {
      reactTableFilters["globalFilter"] = globalFilter;
    }

    columnFilters.forEach((columnFilter) => {
      reactTableFilters[columnFilter.id] = columnFilter.value;
    });

    setReactTableFilters(reactTableFilters);
  }, [globalFilter, columnFilters, lazyLoad]);

  useEffect(() => {
    if (lazyLoad) return;
    setGlobalFilterText(globalFilter);
  }, [globalFilter, setGlobalFilterText, lazyLoad]);

  useEffect(() => {
    const newExternalFilters = {
      ...externalFilters,
      ...reactTableFilters,
    };
    setInputFilters(newExternalFilters);
  }, [externalFilters, reactTableFilters]);

  useEffect(() => {
    if (!crudUrl) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const timer = setTimeout(() => {
      refetch();
    }, 400);

    return () => {
      clearTimeout(timer)
    };
  }, [crudUrl, inputFilters, refetch]);

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
          generateExcel={generateExcel}
          customButtons={customButtons}
          handleModalShow={() => handleModalShowRef.current?.handleModalShow("CREATE")}
          isLoading={isLoading}
          canExport={canExport ?? false}
          exportName={exportName ?? 'Excel_'}
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
              getRowClass={getRowClass}
              getRowStyles={getRowStyles}
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

const queryClient = new QueryClient()

export const Crud = (props: Props & { ref?: Ref<PropsRef> }) => {
  try {
    const client = useQueryClient()
    return (
      <QueryClientProvider client={client}>
        <CrudTable {...props} />
      </QueryClientProvider >
    )
  } catch (e) {
    return (
      <QueryClientProvider client={queryClient}>
        <CrudTable {...props} />
      </QueryClientProvider >
    )
  }

}