/**
 * Collection of supported HTTP methods.
 */
export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

/**
 * Union type representing all supported HTTP methods.
 */
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
