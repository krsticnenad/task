import type {
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import type { ReactNode } from "react";

/**
 * Describes a signle column definition for a data table.
 *
 * @typeParam T - The type of a single row in the table.
 */
export interface TableColumn<T> {
  /**
   * The key of the row object whos value is displayed in this column
   */
  field: keyof T;

  /**
   * The text displayed in the column header.
   */
  header: string;

  /**
   * Optional custom renderer for the cell content.
   * If not provided, the value from {@link field} is rendered by default.
   */
  body?: (row: T) => ReactNode;

  /**
   * Indictes whether the colmun supoorts sorting.
   */
  sortable?: boolean;

  /**
   * Additional CSS class applied to the column cells.
   */
  className?: string;
}

/**
 * Props for the RootTable component.
 *
 * @typeParam T - The the of a single row in the table.
 */
export interface RootTableProps<T> {
  /**
   * The data rows displayed in the table.
   */
  data: T[];

  /**
   * Column definitions used to render the table.
   */
  columns: TableColumn<T>[];

  /**
   * Unique key that identifies eash row.
   */
  dataKey: keyof T;

  /**
   * Indicates whether the table is in a loading state.
   */
  loading?: boolean;

  /**
   * Enables pagination
   */
  paginator?: boolean;

  /**
   * Number of rows displayed per page.
   */
  rows?: number;

  /**
   * Total number of records.
   */
  totalRecords?: number;

  /**
   * Callback triggered when the page changes.
   */
  onPageChange?: (event: DataTablePageEvent) => void;

  /**
   * Field used for sorting.
   */
  sortField?: keyof T;

  /**
   * Sort order: ascending (1), descending (-1), none (9).
   */
  sortOrder?: 1 | -1 | 0;

  /**
   * Callback triggered when sorting changes.
   */
  onSort?: (event: DataTableSortEvent) => void;

  /**
   * Message displayed when no data is available.
   */
  emptyMessage?: string;

  /**
   * Available options for the number of rows per page displayed in paginator
   */
  rowsPerPageOptions?: number[];
}
