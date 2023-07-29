<template>
    <div id="home">
        <base-gallery :config="galleryConfig" />
        <div class="home-content">
            <div class="the-option-wrapper">
                <the-options :config="theOptionsConfig" />
            </div>
            <div class="our-feature">
                <div class="feature-info">
                    <div class="title">
                        {{ t('page.homeView.ourProducts') }}
                    </div>
                    <div class="description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elitsed do eiusmo tempor incididunt ut labore
                    </div>
                </div>
                <div class="display-by d-flex-center">
                    <div
                        v-for="(item, index) of displayBy"
                        class="display-by-item"
                        :key="index"
                        :class="{ active: isActiveItem(index) }"
                        @click="setActiveItem(index)"
                    >
                        {{ item }}
                    </div>
                </div>
                <div
                    class="feature-wrapper d-flex-center"
                    v-if="dataProducts.length > 0"
                >
                    <div
                        v-for="product in productsData"
                        :key="product.ProductID"
                    >
                        <base-product
                            :product="product"
                            @onClickCompare="handleClickCompare(product)"
                        />
                    </div>
                </div>
                <div v-else>
                    <the-empty />
                </div>
            </div>
            <div class="our-feature">
                <div class="feature-wrapper d-flex-center">
                    <base-banner :config="banner1Config" />
                    <base-banner :config="banner2Config" />
                </div>
            </div>
            <div class="our-feature">
                <div class="feature-info">
                    <div class="title">
                        {{ t('page.homeView.latestNews') }}
                    </div>
                    <div class="description">
                        Torem ipsum dolor sit amet, consectetur adipisicing
                        elitsed do eiusmo tempor incididunt ut labore
                    </div>
                </div>
                <div
                    class="feature-wrapper d-flex-center"
                    v-if="thePostsConfig.dataSource.length > 0"
                >
                    <the-posts :config="thePostsConfig" />
                </div>
                <div v-else>
                    <the-empty />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { dataGallery, dataOptions } from '@/mocks';
import type {
    BaseBannerType,
    BaseGalleryType,
    TheOptionsType,
    ThePostsType,
} from '@/types';
import { BaseGallery, BaseProduct, BaseBanner } from '@/components/base';
import { TheEmpty, TheOptions, ThePosts } from '@/components/component';
import { dataProducts, displayBy } from '@/mocks';
import { useI18n } from 'vue3-i18n';
import { getUrls, translateScreen } from '@/utils';
import { onMounted } from 'vue';
import PostApi from '@/apis/post/post-api';
import type { ProductModel } from '@/models';
import { useCompareStore } from '@/stores';

// #region common
const { t, getLocale } = useI18n();
const compareStore = useCompareStore();
// #endregion

// #region effects
onMounted(() => {
    translateScreen(220);
});
// #endregion

// #region Config
const productsData: ProductModel[] = dataProducts.filter((item, index) => {
    if (index < 10) return item;
});

const galleryConfig = ref<BaseGalleryType>({
    height: '650px',
    dataSource: [...dataGallery],
});

const theOptionsConfig = ref<TheOptionsType>({
    dataSource: dataOptions,
});

const postApi = new PostApi();
let dataPosts = postApi.get();

const thePostsConfig = ref<ThePostsType>({
    dataSource: dataPosts,
    limit: 3,
});

const banner1Config = ref<BaseBannerType>({
    title: 'Sale Shirts',
    description: 'Great Discounts Here',
    position: 'right',
    src: getUrls('./src/assets/images/demo/luffy.jpg'),
});

const banner2Config = ref<BaseBannerType>({
    title: 'Sale Jacket',
    description: 'Great Discounts Here',
    position: 'left',
    src: getUrls('./src/assets/images/demo/ace.png'),
});
// #endregion

// #region display by
const activeItem = ref<number>(0);

const isActiveItem = (item: number) => activeItem.value === item;

const setActiveItem = (item: number) => {
    console.log(item);
    activeItem.value = item;
};
// #endregion

// #region handle events
const handleClickCompare = (product: ProductModel) => {
    compareStore.addCompare(product);
};
// #endregion

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            theOptionsConfig.value.dataSource = [
                {
                    text: t('product.shirt'),
                    icon: 'fa6-solid:shirt',
                },
                {
                    text: t('product.glasses'),
                    icon: 'fa6-solid:glasses',
                },
                {
                    text: t('product.socks'),
                    icon: 'fa6-solid:socks',
                },
                {
                    text: t('product.skirt'),
                    icon: 'solar:skirt-bold',
                },
                {
                    text: t('product.jacket'),
                    icon: 'tabler:jacket',
                },
                {
                    text: t('product.hat'),
                    icon: 'mingcute:hat-2-fill',
                },
            ];
        }
    }
);
</script>

<style lang="scss" scoped>
.home-content {
    padding: var(--app-padding-content);
    padding-top: 80px;
    padding-bottom: 80px;
    min-height: 600px;
    .the-option-wrapper {
        padding-bottom: 80px;
    }
    .our-feature {
        & + .our-feature {
            padding-top: 80px;
        }
        .feature-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .title {
                font-size: 36px;
                margin-bottom: 6px;
                font-weight: 700;
                padding-bottom: 14px;
            }
            .description {
                margin: 0 auto;
                font-size: 16px;
                margin-bottom: 22px;
                max-width: 460px;
                text-align: center;
            }
        }
        .display-by {
            justify-content: center;
            margin-bottom: 54px;
            .display-by-item {
                font-size: 18px;
                transition: 0.3s;
                font-weight: 600;
                text-transform: capitalize;
                &.active {
                    color: var(--app-color-secondary);
                }
                &:hover {
                    cursor: pointer;
                    transition: 0.3s;
                    color: var(--app-color-secondary);
                }
                & + .display-by-item {
                    margin-left: 30px;
                }
            }
        }
        .feature-wrapper {
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-around;
            > div {
                margin-bottom: 50px;
            }
        }
    }
}
</style>
