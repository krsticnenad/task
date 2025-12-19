import type { ListQueryParams } from "@/api/api.types";
import {
  useDeleteUserMutation,
  useUsersQuery,
} from "@/api/users/use-users-hooks";
import type { User } from "@/api/users/users.types";
import { ErrorMessages } from "@/constants/messages.error";
import { SuccessMessages } from "@/constants/messages.success";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "@/constants/table.defaults";
import {
  UsersTable,
  usersTableActionsColumns,
  usersTableColumns,
} from "@/features/users";
import { UsersFilters } from "@/features/users-filter";
import { useUpdateSearchParams } from "@/hooks/use-update-users-search-params";
import { useUsersSearchParams } from "@/hooks/use-users-search-params";
import { preloadImages } from "@/utils/preload-images";
import { ConfirmDialog } from "primereact/confirmdialog";
import type {
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function UsersView() {
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);

  const deleteUserHandler = useDeleteUserMutation();
  const searchParams = useUsersSearchParams();
  const { data: users, isLoading } = useUsersQuery(searchParams);
  const {
    setSearchParam,
    setSearchParams,
    removeSearchParams,
    removeSearchParam,
  } = useUpdateSearchParams();
  const [routerSearchParams] = useSearchParams();
  const toast = useRef<Toast>(null);

  const usersData = users?.data ?? [];
  const totalRecords = users?.totalRecords;

  const handleOnPageChange = (event: DataTablePageEvent) => {
    const page = event.first / event.rows + 1;
    const limit = event.rows;
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
    setUserToDelete(id);
    setIsVisibleDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserHandler.mutateAsync(userToDelete.toString());

      toast.current?.show({
        severity: "success",
        summary: SuccessMessages.deleteUser.summary,
        detail: SuccessMessages.deleteUser.detail,
      });
    } catch (err: unknown) {
      const detailMessage =
        err instanceof Error ? err.message : ErrorMessages.deleteUser.detail;

      toast.current?.show({
        severity: "error",
        summary: ErrorMessages.deleteUser.summary,
        detail: detailMessage,
      });
    } finally {
      setIsVisibleDialog(false);
    }
  };

  const handleFilterChange = (
    key: keyof ListQueryParams,
    value: string | number | null
  ) => {
    if (!value) {
      removeSearchParam(key);
    } else {
      setSearchParam(key, value);
    }
  };

  useEffect(() => {
    if (!usersData.length) return;

    preloadImages(usersData, "avatar");
  }, [usersData]);

  return (
    <div className="flex w-12 h-full align-items-center justify-content-center">
      <Toast ref={toast} />
      <ConfirmDialog
        visible={isVisibleDialog}
        position="top"
        onHide={() => setIsVisibleDialog(false)}
        message="Do you want to delete this record?"
        header="Delete Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteConfirmation}
        acceptClassName="p-button-danger"
        rejectClassName="p-button-text"
      />
      <div className="w-12 md:w-10 px-2">
        <div className="flex w-full flex-column md:flex-row align-content-center justify-content-between">
          <h1>Users</h1>
          <UsersFilters
            searchParams={searchParams}
            onFilterChange={handleFilterChange}
          />
        </div>
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
          size="small"
          first={(searchParams?.page - 1) * searchParams?.limit}
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
