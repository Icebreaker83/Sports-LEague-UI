import { handleRequest } from '@/plugins/axios';

export const useEndpoints = () => {
  const appVersionRequest = async () => {
    return handleRequest({ method: 'get', url: 'version' });
  };
  return {
    appVersionRequest,
  };
};
