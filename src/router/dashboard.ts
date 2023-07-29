import i18n from '@/locales/i18n';

const t = i18n.t;

const dashboardRouter = [
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            Title: t('app.title.dashboard'),
        },
        component: () => import('../views/dashboard/DashBoardView.vue'),
    },
];

export default dashboardRouter;
