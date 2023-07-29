import i18n from '@/locales/i18n';

const t = i18n.t;

const checkoutRouter = [
    {
        path: '/checkout',
        name: 'checkout',
        meta: {
            Title: t('app.title.checkout'),
        },
        component: () => import('../views/checkout/CheckoutView.vue'),
    },
];

export default checkoutRouter;
