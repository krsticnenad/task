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
  lazy,
  rows = DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions,
  emptyMessage = EMPTY_STATE_MESSAGE,
  first,
  size = "normal",
}: RootTableProps<T>) {
  const tableHeight = data.length < 10 ? "auto" : "600px";
  return (
    <DataTable
      loading={loading}
      tableStyle={{ height: tableHeight, width: "100%" }}
      stripedRows
      showGridlines
      first={first}
      value={data}
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
      scrollHeight="600px"
      scrollable
      size={size}
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
