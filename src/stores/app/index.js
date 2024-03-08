import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useEndpoints } from './api';

export const useAppStore = defineStore('app', () => {
  const version = ref('0.0');
  const { appVersionRequest } = useEndpoints();
  const fetchAppVersion = async () => {
    const response = await appVersionRequest();
    if (!response?.data?.version) return;
    version.value = response.data.version;
  };
  return {
    version,
    fetchAppVersion,
  };
});
