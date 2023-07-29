import i18n from '@/locales/i18n';

const t = i18n.t;

const productRouter = [
    {
        path: '/product/:id',
        name: 'product',
        meta: {
            Title: t('app.title.listProducts'),
        },
        component: () => import('../views/products/ProductDetailsView.vue'),
    },
];

export default productRouter;
