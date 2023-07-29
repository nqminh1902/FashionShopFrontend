import i18n from '@/locales/i18n';

const t = i18n.t;

const collectionRouter = [
    {
        path: '/collection/:id',
        name: 'collection',
        meta: {
            Title: t('app.title.collection'),
        },
        component: () => import('../views/collections/CollectionView.vue'),
    },
];

export default collectionRouter;
