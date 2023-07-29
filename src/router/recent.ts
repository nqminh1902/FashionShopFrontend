import i18n from '@/locales/i18n';

const t = i18n.t;

const recentRouter = [
    {
        path: '/recent',
        name: 'recent',
        meta: {
            Title: t('app.title.recent'),
        },
        component: () => import('../views/recent/RecentView.vue'),
    },
];

export default recentRouter;
