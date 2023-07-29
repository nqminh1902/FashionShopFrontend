import i18n from '@/locales/i18n';

const t = i18n.t;

const ordersRouter = [
    {
        path: '/orders',
        name: 'orders',
        meta: {
            Title: t('app.title.orders'),
        },
        component: () => import('../views/orders/OrdersView.vue'),
    },
];

export default ordersRouter;
