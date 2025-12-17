import type { FC } from "react";
import type { UsersTableProps } from "./users-table.types";
import { RootTable } from "@/components/table";
import { usersTableColumns } from "./users-table.columns";
import {
  DEFAULT_ROWS_PER_PAGE,
  EMPTY_STATE_MESSAGE,
} from "@/constants/table.defaults";

export const UsersTable: FC<UsersTableProps> = ({ users, isLoading }) => {
  return (
    <RootTable
      data={users}
      columns={usersTableColumns}
      dataKey="id"
      loading={isLoading}
      paginator={true}
      rows={DEFAULT_ROWS_PER_PAGE}
      emptyMessage={EMPTY_STATE_MESSAGE}
    />
  );
};
