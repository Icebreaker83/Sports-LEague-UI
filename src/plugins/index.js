/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from '../router';
import i18n from './i18n';
import pinia from './pinia';
import { configureCookies } from './vue3-cookies';
import { configureAxios } from './axios';

/**
 * Registers all plugins with vue app
 *
 * @param {Vue} app - Vue app instance
 */
export const registerPlugins = (app) => {
  configureCookies();
  configureAxios();
  app.use(i18n).use(pinia).use(router);
};
