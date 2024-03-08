import { t } from '@/plugins/i18n';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/layouts/PrivateLayout.vue'),
        children: [
          {
            name: 'schedule',
            path: 'schedule',
            component: () => import('@/views/league/schedule/ScheduleView.vue'),
            meta: {
              title: t('league.schedule.heading'),
            },
          },
          {
            name: 'leaderboard',
            path: 'leaderboard',
            component: () =>
              import('@/views/league/leaderboard/LeaderboardView.vue'),
            meta: {
              title: t('league.leaderboard.heading'),
            },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
];

export default routes;
