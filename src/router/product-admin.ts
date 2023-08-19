import i18n from '@/locales/i18n';

const t = i18n.t;

const productAdminRouter = [
    {
        path: '/product-admin',
        name: 'product-admin',
        meta: {
            Title: t('app.title.product'),
        },
        component: () => import('../views/admin/product/ProductAdmin.vue'),
    },
];

export default productAdminRouter;