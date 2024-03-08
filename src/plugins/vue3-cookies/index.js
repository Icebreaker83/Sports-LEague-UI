import { globalCookiesConfig } from 'vue3-cookies';

export const configureCookies = () => {
  globalCookiesConfig({
    secure: window.location.protocol === 'https:',
  });
};