import i18n from '@/locales/i18n';

const t = i18n.t;

const cartRouter = [
    {
        path: '/cart',
        name: 'cart',
        meta: {
            Title: t('app.title.cart'),
        },
        component: () => import('../views/cart/CartView.vue'),
    },
];

export default cartRouter;
