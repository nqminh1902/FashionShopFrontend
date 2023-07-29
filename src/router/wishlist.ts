import i18n from '@/locales/i18n';

const t = i18n.t;

const wishlistRouter = [
    {
        path: '/wishlist',
        name: 'wishlist',
        meta: {
            Title: t('app.title.wishlist'),
        },
        component: () => import('../views/wishlist/WishListView.vue'),
    },
];

export default wishlistRouter;
