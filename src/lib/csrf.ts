/**
 * CSRF Protection Note:
 * HTTP-only cookies are inherently CSRF-safe because:
 * - JavaScript cannot access the cookie
 * - Cookies are sent automatically with same-origin requests
 * - Cross-origin requests cannot send cookies without explicit credentials
 *
 * For the web portal using HTTP-only cookies, traditional CSRF tokens are not needed.
 * However, if adding CSRF protection, implement it here.
 */

export const fetchCsrfToken = async (): Promise<string | null> => {
  // For HTTP-only cookie auth, CSRF tokens are not required
  // This is a no-op but kept for potential future use
  return null;
};

export const getCsrfHeaders = (token: string) => {
  // No CSRF headers needed for HTTP-only cookie auth
  return {};
};
