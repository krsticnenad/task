import type { FC } from "react";
import type { UsersTableProps } from "./users-table.types";
import { RootTable } from "@/components/table";
import { EMPTY_STATE_MESSAGE } from "@/constants/table.defaults";

export const UsersTable: FC<UsersTableProps> = ({
  columns,
  data,
  loading,
  rows,
  rowsPerPageOptions,
  totalRecords,
  lazy,
  first,
  scrollable,
  scrollHeight,
  size,
  sortField,
  sortOrder,
  onPageChange,
  onSort,
}) => {
  return (
    <RootTable
      sortField={sortField}
      sortOrder={sortOrder}
      first={first}
      data={data}
      columns={columns}
      dataKey="id"
      loading={loading}
      paginator={true}
      rows={rows}
      rowsPerPageOptions={rowsPerPageOptions}
      totalRecords={totalRecords}
      emptyMessage={EMPTY_STATE_MESSAGE}
      onPageChange={onPageChange}
      onSort={onSort}
      lazy={lazy}
      scrollable={scrollable}
      scrollHeight={scrollHeight}
      size={size}
    />
  );
};
