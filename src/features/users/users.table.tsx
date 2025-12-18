import type { FC } from "react";
import type { UsersTableProps } from "./users-table.types";
import { RootTable } from "@/components/table";
import { usersTableColumns } from "./users-table.columns";
import { EMPTY_STATE_MESSAGE } from "@/constants/table.defaults";

export const UsersTable: FC<UsersTableProps> = ({ users, isLoading, rows }) => {
  return (
    <RootTable
      data={users}
      columns={usersTableColumns}
      dataKey="id"
      loading={isLoading}
      paginator={true}
      rows={rows}
      emptyMessage={EMPTY_STATE_MESSAGE}
    />
  );
};
