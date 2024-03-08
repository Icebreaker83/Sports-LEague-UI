import { handleRequest } from '@/plugins/axios';

/**
 * This function creates and returns an object containing authorization-related endpoints.
 *
 * @returns {Object} An object with the following property:
 *   - `accessTokenRequest`: A function that handles an asynchronous HTTP GET request to retrieve an access token.
 */
export const useEndpoints = () => {
  /**
   * Fetches an access token from the specified endpoint.
   *
   * @returns {Promise<Object>} A Promise that resolves to the access token response data.
   */
  const accessTokenRequest = async () => {
    return handleRequest({ method: 'get', url: 'v1/getAccessToken' });
  };

  return {
    accessTokenRequest,
  };
};
