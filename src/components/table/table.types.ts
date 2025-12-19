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
 * Base props for the RootTable component.
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

  /**
   * Enables lazy loading for lagre datasets, fetching only the current page
   * and relying on external callbacks for pagination, sorting and filtering.
   */
  lazy?: boolean;

  /**
   * Enables vertical scrolling for the table when set to true.
   *
   * Must be used together with `scrollHeight` to define the visible viewport height,
   * keeping headers fiexed while the data scrolls.
   */
  scrollable?: boolean;

  /**
   * Sets the height of the scrollable viewport for the table.
   *
   * Only relevant if `scrollable` is true. Allows the table body to scroll while
   * keepiing the header fixed.
   */
  scrollHeight?: string;

  /**
   * Index of the first row to display in the current page (0-based).
   */
  first?: number;

  /**
   * Data table size
   */
  size?: "small" | "normal" | "large";
}
