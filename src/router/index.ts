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
import accountAdminRouter from './account-admin';
import productAdminRouter from './product-admin';
import customerAdminRouter from './customer-admin';
import collectionAdminRouter from './collection-admin';
import orderAdminRouter from './order-admin';
import categoryAdminRouter from './category-admin';
import postAdminRouter from './post-admin';
import accountRouter from './account';
import productRouter from './product';
import checkoutRouter from './checkout';
import recentRouter from './recent';
import i18n from '@/locales/i18n';
import postRouter from './post';
import ordersRouter from './orders';
import productColorRouter from './product-color'

const t = i18n.t;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            name : 'fashionShop',
            meta: {
                Title: t('app.title.home'),
            },
            children:[
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
                ...shopRouter,
                ...cartRouter,
                ...wishlistRouter,
                ...collectionRouter,
                ...accountRouter,
                ...productRouter,
                ...postRouter,
                ...checkoutRouter,
                ...recentRouter,
                ...ordersRouter,
            ],
            component: () => import('../views/FashionShop/FashionShop.vue'),
        },
        {
            path: '/admin',
            meta: {
                Title: t('app.title.admin'),
            },
            redirect: { name: "dashboard" }, 
            children:[
                ...dashboardRouter,
                ...postAdminRouter,
                ...categoryAdminRouter,
                ...orderAdminRouter,
                ...collectionAdminRouter,
                ...productAdminRouter,
                ...customerAdminRouter,
                ...accountAdminRouter,
                ...productColorRouter
            ],
            component: () => import('../views/admin/AdminView.vue'),
        },
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
