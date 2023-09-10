import i18n from '@/locales/i18n';

const t = i18n.t;

const categoryRouter = [
    {
        path: '/category/:id',
        name: 'category',
        meta: {
            Title: t('app.title.category'),
        },
        component: () => import('../views/category/CategoryView.vue'),
    },
];

export default categoryRouter;