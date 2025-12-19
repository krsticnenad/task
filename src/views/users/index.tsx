import { useUsersQuery } from "@/api/users/use-users-query";
import type { User } from "@/api/users/users.types";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "@/constants/table.defaults";
import { UsersTable } from "@/features/users";
import { useUpdateSearchParams } from "@/hooks/use-update-users-search-params";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";
import { preloadImages } from "@/utils/preload-images";
import type {
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function UsersView() {
  const searchParams = useUsersSearchParams();
  const { data: users, isLoading } = useUsersQuery(searchParams);
  const { setSearchParams, removeSearchParams } = useUpdateSearchParams();
  const [routerSearchParams] = useSearchParams();
  const usersData = users?.data ?? [];
  const totalRecords = users?.totalRecords;

  const handleOnPageChange = (event: DataTablePageEvent) => {
    const page = event.first / event.rows + 1;
    const limit = event.rows;
    setSearchParams({ page, limit });
  };

  const handleOnSort = (event: DataTableSortEvent) => {
    const clickedField = event.sortField === searchParams.sort;

    if (!clickedField) {
      setSearchParams({
        sort: event.sortField,
        order: "asc",
      });
      return;
    }

    if (searchParams.order === "asc") {
      setSearchParams({
        sort: event.sortField,
        order: "desc",
      });
      return;
    }

    removeSearchParams(["sort", "order"]);
  };

  const handleSortOrder = () => {
    const order = routerSearchParams.get("order");
    return order === "asc" ? 1 : order === "desc" ? -1 : undefined;
  };

  useEffect(() => {
    if (!usersData.length) return;

    preloadImages(usersData, "avatar");
  }, [usersData]);

  return (
    <div className="flex w-12 h-full align-items-center justify-content-center">
      <div className="w-10">
        <h1>Users</h1>
        <UsersTable
          sortField={
            (routerSearchParams.get("sort") as keyof User) || undefined
          }
          scrollable
          scrollHeight="578px"
          size="small"
          first={(searchParams.page - 1) * searchParams.limit}
          data={usersData}
          loading={isLoading}
          rows={searchParams.limit}
          totalRecords={totalRecords}
          rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
          lazy
          onPageChange={(event: DataTablePageEvent) =>
            handleOnPageChange(event)
          }
          onSort={(event: DataTableSortEvent) => handleOnSort(event)}
          sortOrder={handleSortOrder()}
        />
      </div>
    </div>
  );
}
