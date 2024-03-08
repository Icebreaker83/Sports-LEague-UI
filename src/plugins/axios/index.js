import axios from 'axios';

const configureAxios = () => {
  const apiRoot = process.env.VUE_APP_API_URL;
  axios.defaults.baseURL = apiRoot;
};

/**
 * Handles an HTTP request using Axios and manages potential success, error, and finalization scenarios.
 *
 * This function is intended to be used within composables or stateful components in real-world projects, where
 * mechanisms for handling alerts, global spinners, and state management are more appropriately implemented.
 *
 * **Parameters:**
 * - `request` (object): The configuration object for the Axios request.
 *
 * **Returns:**
 * - (Promise<AxiosResponse>): A Promise object that resolves with the Axios response
 *   on successful execution or rejects if an error occurs (unless canceled).
 *   If the request is canceled, the Promise is not rejected, but error alerts are
 *   not implemented in this simplified version.
 *
 * **Error Handling:**
 * - If an error occurs and it's not a canceled request, the error is logged to the console.
 *   Error alerts are not implemented in this simplified version.
 *
 * **Callbacks and Alerts (Optional):**
 * - In actual projects, this function would be integrated within a composable or stateful component
 *   to implement custom success and error alerts, global spinners, and state updates, taking advantage
 *   of relevant libraries or frameworks.
 *
 * **Finally Callback (Optional):**
 * - This function can be extended to include a `finally` callback that always executes after the
 *   request completes, regardless of success or error. This callback is not implemented in the
 *   provided code.
 */
const handleRequest = async (request) => {
  return axios(request)
    .then((response) => {
      // implement success alerts here, onSuccess callbacks etc
      return response;
    })
    .catch((error) => {
      // do not throw error if request is canceled
      if (axios.isCancel(error)) return;
      console.error(error);
      // implement error alerts here, onError callbacks etc
    })
    .finally(() => {
      // implement finally callbacks
    });
};
export { axios as apiClient, configureAxios, handleRequest };
