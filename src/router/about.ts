import i18n from '@/locales/i18n';

const t = i18n.t;

const aboutRouter = [
    {
        path: '/about',
        name: 'about',
        meta: {
            Title: t('app.title.about'),
        },
        component: () => import('../views/about/AboutView.vue'),
    },
];

export default aboutRouter;
