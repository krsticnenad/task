import {
  useDeleteUserMutation,
  useUsersQuery,
} from "@/api/users/use-users-query";
import type { User } from "@/api/users/users.types";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "@/constants/table.defaults";
import {
  UsersTable,
  usersTableActionsColumns,
  usersTableColumns,
} from "@/features/users";
import { useUpdateSearchParams } from "@/hooks/use-update-users-search-params";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";
import { preloadImages } from "@/utils/preload-images";
import { ConfirmDialog } from "primereact/confirmdialog";
import type {
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function UsersView() {
  const [tableHeight, setTableHeight] = useState<string>("600px");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);

  const deleteUserHandler = useDeleteUserMutation();
  const searchParams = useUsersSearchParams();
  const { data: users, isLoading } = useUsersQuery(searchParams);
  const { setSearchParams, removeSearchParams } = useUpdateSearchParams();
  const [routerSearchParams] = useSearchParams();

  const usersData = users?.data ?? [];
  const totalRecords = users?.totalRecords;

  const handleOnPageChange = (event: DataTablePageEvent) => {
    const page = event.first / event.rows + 1;
    const limit = event.rows;
    if (limit < 10) setTableHeight("auto");
    setSearchParams({ page, limit });
  };

  const handleOnSort = (event: DataTableSortEvent): void => {
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

  const handleDeleteAction = (id: number) => {
    console.log("Id", id);
    setUserToDelete(id);
    setIsVisibleDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    if (!userToDelete) return;

    deleteUserHandler.mutate(userToDelete.toString(), {
      onSuccess: () => {
        setIsVisibleDialog(false);
        setUserToDelete(null);
      },
      onError: (err) => {
        console.log("Error", err);
      },
    });
  };

  useEffect(() => {
    if (!usersData.length) return;

    preloadImages(usersData, "avatar");
  }, [usersData]);

  return (
    <div className="flex w-12 h-full align-items-center justify-content-center">
      <ConfirmDialog
        visible={isVisibleDialog}
        position="top"
        onHide={() => setIsVisibleDialog(false)}
        message="Do you want to delete this record?"
        header="Delete Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteConfirmation}
        reject={() => {}}
        acceptClassName="p-button-danger"
        rejectClassName="p-button-text"
      />
      <div className="w-10">
        <h1>Users</h1>
        <UsersTable
          columns={[
            ...usersTableColumns,
            usersTableActionsColumns(handleDeleteAction),
          ]}
          sortField={
            (routerSearchParams.get("sort") as keyof User) || undefined
          }
          scrollable
          scrollHeight="600px"
          tableHeight={tableHeight}
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
