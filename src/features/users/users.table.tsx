import type { FC } from "react";
import type { UsersTableProps } from "./users-table.types";
import { RootTable } from "@/components/table";
import { usersTableColumns } from "./users-table.columns";
import { EMPTY_STATE_MESSAGE } from "@/constants/table.defaults";

export const UsersTable: FC<UsersTableProps> = ({
  data,
  loading,
  rows,
  rowsPerPageOptions,
  totalRecords,
  lazy,
  first,
  scrollable,
  scrollHeight,
  onPageChange,
  onSort,
}) => {
  return (
    <RootTable
      first={first}
      data={data}
      columns={usersTableColumns}
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
    />
  );
};
