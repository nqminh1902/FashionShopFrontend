import i18n from '@/locales/i18n';

const t = i18n.t;

const postRouter = [
    {
        path: '/post/:id',
        name: 'post',
        meta: {
            Title: t('app.title.post'),
        },
        component: () => import('../views/posts/PostDetailsView.vue'),
    },
];

export default postRouter;
