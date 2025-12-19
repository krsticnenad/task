import { DataTable } from "primereact/DataTable";
import { Column } from "primereact/Column";
import type { RootTableProps } from "./table.types";
import {
  DEFAULT_ROWS_PER_PAGE,
  EMPTY_STATE_MESSAGE,
} from "@/constants/table.defaults";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useRef, useState, type ReactNode } from "react";

const MIN_LOADING_TIME: number = 300; // ms

/**
 * Reusable data table component built on top PrimeReact's {@link DataTable}
 *
 * @typeParam T - The type of a single row in the table.
 */
export function RootTable<T extends object>({
  data,
  columns,
  dataKey,
  loading,
  paginator,
  totalRecords,
  onPageChange,
  onSort,
  sortField,
  sortOrder,
  lazy,
  rows = DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions,
  emptyMessage = EMPTY_STATE_MESSAGE,
  first,
  size = "normal",
}: RootTableProps<T>) {
  const skeletonData = Array.from({ length: rows }, (_, i) => ({ id: i } as T));
  const loadingStartTime = useRef<number | null>(null);
  const [visibleLoading, setIsVisibleLoading] = useState(false);

  const bodyTemplate = (rowData: T, field: keyof T): ReactNode => {
    if (visibleLoading)
      return <Skeleton width="100%" height="35px" style={{ padding: "8px" }} />;
    return rowData[field] != null ? String(rowData[field]) : null;
  };

  useEffect(() => {
    if (loading) {
      loadingStartTime.current = Date.now();
      setIsVisibleLoading(true);
    } else if (loadingStartTime.current) {
      const elapsed = Date.now() - loadingStartTime.current;
      const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);
      const timer = setTimeout(() => {
        setIsVisibleLoading(false);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <DataTable
      style={{ minHeight: "578px", width: "100%" }}
      stripedRows
      showGridlines
      first={first}
      value={visibleLoading ? skeletonData : data}
      paginator={paginator}
      rows={rows}
      totalRecords={totalRecords}
      onPage={onPageChange}
      sortField={sortField as string}
      sortOrder={sortOrder}
      onSort={onSort}
      dataKey={dataKey as string}
      emptyMessage={emptyMessage}
      rowsPerPageOptions={rowsPerPageOptions}
      lazy={lazy}
      scrollHeight="578px"
      scrollable
      size={size}
    >
      {columns.map((column) => (
        <Column
          key={String(column.field)}
          field={String(column.field)}
          header={column.header}
          body={
            column.body
              ? (rowData: T) =>
                  visibleLoading ? (
                    <Skeleton
                      width="100%"
                      height="35px"
                      style={{ padding: "8px" }}
                    />
                  ) : (
                    column.body!(rowData)
                  )
              : (rowData: T) => bodyTemplate(rowData, column.field)
          }
          sortable={column.sortable}
          className={column.className}
        />
      ))}
    </DataTable>
  );
}
