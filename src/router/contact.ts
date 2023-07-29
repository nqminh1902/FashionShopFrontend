import i18n from '@/locales/i18n';

const t = i18n.t;

const contactRouter = [
    {
        path: '/contact',
        name: 'contact',
        meta: {
            Title: t('app.title.contact'),
        },
        component: () => import('../views/contact/ContactView.vue'),
    },
];

export default contactRouter;
