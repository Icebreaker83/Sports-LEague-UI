import { defineStore } from 'pinia';
import { useAuthorization } from '@/composables/authorization';
import LeagueService from '@/services/LeagueService';

export const useLeagueStore = defineStore('league', () => {
  const { getAccessToken } = useAuthorization();

  const league = new LeagueService(getAccessToken());

  return {
    league,
  };
});
