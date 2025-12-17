import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UsersKeys } from "./users.key";
import { usersApi } from "./users.api";
import type { ListQueryParams } from "../api.types";

/**
 * React Query hook for fetching the list of users.
 *
 * Uses {@link UsersKeys.all} as the query key and {@link usersApi.getAll}
 * as the query function.
 *
 * @returns React Query results object with users data.
 */
export const useUsersQuery = (params: ListQueryParams) => {
  return useQuery({
    queryKey: UsersKeys.all,
    queryFn: () => usersApi.getAll(params),
  });
};

/**
 * React Query mutation hook for deleting a user.
 *
 * On successful deletion, all user-related queries are invalidated
 * to ensure the users list is refreshed.
 *
 * @returns React Query mutation object for deleting a user.
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UsersKeys.all });
    },
  });
};
