import { useCookies } from 'vue3-cookies';
import { useEndpoints } from './api';

/**
 * Composable hook for managing authorization tokens and refresh.
 *
 * @returns {object} An object containing functions for fetching, retrieving, and (later) refreshing the access token.
 * @property {fetchAccessToken} fetchAccessToken - Asynchronous function to fetch a new access token from the server.
 * @property {getAccessToken} getAccessToken - Function to retrieve the current access token from cookies.
 * @property {refreshAccessToken} refreshAccessToken - Asynchronous function to refresh the expiring access token (implementation will be added later).
 */
export const useAuthorization = () => {
  const { cookies } = useCookies();

  const fetchAccessToken = async () => {
    const { accessTokenRequest } = useEndpoints();
    const response = await accessTokenRequest();
    const accessToken = response?.data?.access_token;

    if (!accessToken) {
      console.error('No access_token in request response');
      return;
    }

    cookies.set('_access_token', accessToken);
  };

  const getAccessToken = () => {
    return cookies.get('_access_token') || '';
  };

  /**
   * Placeholder function for refreshAccessToken.
   * Will be implemented later to handle token refresh logic.
   */
  const refreshAccessToken = async () => {
    throw new Error('refreshAccessToken not implemented yet');
  };

  return {
    fetchAccessToken,
    getAccessToken,
    refreshAccessToken,
  };
};
