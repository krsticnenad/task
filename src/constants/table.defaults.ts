/** Default number of rows displayed per page when pagination is enabled. */
export const DEFAULT_ROWS_PER_PAGE: number = 10;

/** Default message displayed when the table has no data. */
export const EMPTY_STATE_MESSAGE: string = "No data.";

/** Min number of rows that can be displayed per page in tables.
 *
 * If a user tries to manually set a lower value via the URL,
 * this ensures the table will always displays at least 1 row.
 */
export const MIN_ROWS_PER_PAGE: number = 1;

/** Max number of rows that can be displayed per page in tables.
 *
 * If a user tries to request more rows than this limit via URL query params,
 * the value will be limited to this number.
 */
export const MAX_ROWS_PER_PAGE: number = 100;

/** Min page number allowed in paginated tables.
 *
 * If a user tries to manually set a lower page number via the URL,
 * this ensures pagination will always starts from page 1.
 */
export const MIN_PAGE: number = 1;
