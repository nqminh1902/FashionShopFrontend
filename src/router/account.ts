import i18n from '@/locales/i18n';

const t = i18n.t;

const accountRouter = [
    {
        path: '/account',
        name: 'account',
        meta: {
            Title: t('app.title.account'),
        },
        component: () => import('../views/account/AccountView.vue'),
    },
];

export default accountRouter;
