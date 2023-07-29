import { createRouter, createWebHistory } from 'vue-router';
import homeRouter from './home';
import aboutRouter from './about';
import contactRouter from './contact';
import dashboardRouter from './dashboard';
import shopRouter from './shop';
import cartRouter from './cart';
import wishlistRouter from './wishlist';
import collectionRouter from './collection';
import adminRouter from './admin';
import accountRouter from './account';
import productRouter from './product';
import checkoutRouter from './checkout';
import recentRouter from './recent';
import i18n from '@/locales/i18n';
import postRouter from './post';
import ordersRouter from './orders';

const t = i18n.t;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            meta: {
                Title: t('app.title.home'),
            },
            component: () => import('../views/home/HomeView.vue'),
        },
        ...homeRouter,
        ...aboutRouter,
        ...contactRouter,
        ...dashboardRouter,
        ...shopRouter,
        ...cartRouter,
        ...wishlistRouter,
        ...collectionRouter,
        ...adminRouter,
        ...accountRouter,
        ...productRouter,
        ...postRouter,
        ...checkoutRouter,
        ...recentRouter,
        ...ordersRouter,
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/errorPages/404Page.vue'),
        },
    ],
});

router.afterEach((e) => {
    document.title = e.meta.Title
        ? `${e.meta.Title} | ${t('app.name')} - ${t('app.slogan')}`
        : `${t('app.title.notFound')} | ${t('app.name')} - ${t('app.slogan')}`;
});

export default router;
