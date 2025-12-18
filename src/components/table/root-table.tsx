import { DataTable } from "primereact/DataTable";
import { Column } from "primereact/Column";
import type { RootTableProps } from "./table.types";
import {
  DEFAULT_ROWS_PER_PAGE,
  EMPTY_STATE_MESSAGE,
} from "@/constants/table.defaults";

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
  rows = DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions,
  emptyMessage = EMPTY_STATE_MESSAGE,
}: RootTableProps<T>) {
  return (
    <DataTable
      value={data}
      loading={loading}
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
      lazy
    >
      {columns.map((column) => (
        <Column
          key={String(column.field)}
          field={String(column.field)}
          header={column.header}
          body={column.body}
          sortable={column.sortable}
          className={column.className}
        />
      ))}
    </DataTable>
  );
}
