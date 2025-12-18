/**
 * Builds a URL query string from an object of key-value pairs.
 *
 * All keys and values are URL-encoded to ensure the are safe
 * to use in a URL, reducing the risk of XSS attacks.
 *
 * @param params - Object containing key-value pairs to convert into query string.
 * @returns A query string starting with '?' or an empty string if no params.
 */
export function buildQueryString(params?: Record<string, any>): string {
  if (!params) return "";

  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return query ? `?${query}` : "";
}
