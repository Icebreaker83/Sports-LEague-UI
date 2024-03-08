import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { t } from '@/plugins/i18n';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const appTitle = t('appTitle');
  document.title = to.meta?.title ? `${to.meta.title} | ${appTitle}` : appTitle;

  to.fullPath === '/' ? next({ name: 'schedule' }) : next();
});

export default router;
