import i18n from '@/locales/i18n';

const t = i18n.t;

const shopRouter = [
    {
        path: '/shop',
        name: 'shop',
        meta: {
            Title: t('app.title.shop'),
        },
        component: () => import('../views/shop/ShopView.vue'),
    },
];

export default shopRouter;
