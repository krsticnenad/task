import { QueryClient } from "@tanstack/react-query";

/**
 * Shared QueryClient instance
 *
 * Provides default configuration for query behavior
 * such as caching, refetching and retry logic.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Time in ms that query data is considered refresh. */
      staleTime: 1000 * 60,

      /** Disabled automatic refetching when the browser window regains focus. */
      refetchOnWindowFocus: false,

      /** Number of retry attempts for failed queries. */
      retry: 1,
    },
  },
});
