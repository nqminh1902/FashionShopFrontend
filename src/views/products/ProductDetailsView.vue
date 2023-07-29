<template>
    <div id="product-details" class="w-full">
        <base-breadcrumbs :config="breadcrumbDetailsConfig" />
        <div
            class="product-detail lg:flex sm:block md:flex lg:max-w-4xl md:max-w-screen-md"
        >
            <div class="flex-1 flex-col items-center d-flex pl-5 pr-5 mb-4">
                <div class="product-img unselect sm:w-full md:w-96">
                    <img
                        style="width: 100%; height: 100%"
                        :src="imageSrc"
                        alt=""
                    />
                    <div
                        class="control-left shadow-lg shadow-indigo-500/40 animate-bounce"
                        @click="handleChangeImage('back')"
                    >
                        <Icon icon="ep:arrow-left" />
                    </div>
                    <div
                        class="control-right shadow-lg shadow-indigo-500/40 animate-bounce"
                        @click="handleChangeImage('next')"
                    >
                        <Icon icon="ep:arrow-right" />
                    </div>
                </div>
                <div class="product-list-img">
                    <div class="grid grid-cols-4 gap-5">
                        <img
                            v-for="(img, index) of product.ProductImage"
                            style="width: 75px; height: 75px"
                            alt=""
                            :key="index"
                            :class="{ active: index == selectImageIndex }"
                            :src="img"
                            @click="setSelectedImage(index)"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-1 product-content">
                <div class="product-detail-code">
                    <strong>
                        {{ t('base.product.sku') }}{{ t('sign.colon') }}
                    </strong>
                    {{ product.ProductCode }}
                </div>
                <div class="product-detail-available">
                    <strong
                        >{{ t('base.product.availability')
                        }}{{ t('sign.colon') }}
                    </strong>
                    {{ product.Quantity }}
                </div>
                <div class="product-detail-name">
                    {{ product.ProductName }}
                </div>
                <div class="product-detail-price">
                    <div
                        v-if="product.Sale"
                        class="product-price"
                        style="margin-top: 0"
                    >
                        <span
                            class="price-old"
                            style="text-decoration: line-through"
                            >{{ formatCurrency(product.Price) }}
                        </span>
                        <span style="margin-left: 8px">{{
                            formatCurrency(product.Sale)
                        }}</span>
                    </div>
                    <p class="" v-else>
                        {{ formatCurrency(product.Price) }}
                    </p>
                </div>
                <div class="product-detail-description">
                    {{ product.Summary }}
                </div>
                <div class="product-detail-color mb-3">
                    <label class="mb-1">{{
                        t('page.productDetail.color')
                    }}</label>
                    <base-select-box :config="colorSelectBoxConfig" />
                </div>
                <div class="product-detail-size mb-5">
                    <label class="mb-1">{{
                        t('page.productDetail.size')
                    }}</label>
                    <base-select-box :config="sizeSelectBoxConfig" />
                </div>
                <div class="product-detail-cart">
                    <base-number-box
                        :config="numberBoxConfig"
                        @on-value-change="handleValueChange"
                    />
                    <base-button :config="buttonConfig" class="m-l-10" />
                </div>
                <div class="product-detail-feature">
                    <div class="add-to-wishlist d-flex-center">
                        <Icon icon="fa6-regular:heart" />
                        <span style="margin-left: 8px">{{
                            t('base.product.addToWishlist')
                        }}</span>
                    </div>
                    <div
                        class="add-to-compare d-flex-center"
                        style="margin-left: 16px"
                    >
                        <Icon icon="fa6-solid:code-compare" />
                        <span style="margin-left: 8px">{{
                            t('base.product.addToCompare')
                        }}</span>
                    </div>
                </div>
                <div class="product-detail-social">
                    <h4 class="">
                        {{ t('base.product.share') }}{{ t('sign.colon') }}
                    </h4>
                    <a href="">
                        <Icon icon="uil:facebook" />
                    </a>
                    <a href="">
                        <Icon icon="formkit:twitter" />
                    </a>
                    <a href="">
                        <Icon icon="uil:linkedin" />
                    </a>
                </div>
            </div>
        </div>
        <div class="lg:max-w-4xl md:max-w-screen-md container mx-auto mt-24">
            <div class="product-tabs">
                <div
                    class="tab md:text-xl text-base lg:mx-7 mx-2 md:mx-7"
                    :class="selectionTab == 1 && 'selected-tab'"
                    @click="handleChangeTab(1)"
                >
                    {{ t('page.productDetail.description') }}
                </div>
                <div
                    class="tab md:text-xl text-base lg:mx-7 mx-2 md:mx-7"
                    :class="selectionTab == 2 && 'selected-tab'"
                    @click="handleChangeTab(2)"
                >
                    {{ t('page.productDetail.additionalInfo') }}
                </div>
                <div
                    class="tab md:text-xl text-base lg:mx-7 mx-2 md:mx-7"
                    :class="selectionTab == 3 && 'selected-tab'"
                    @click="handleChangeTab(3)"
                >
                    {{ t('page.productDetail.review') }}
                </div>
            </div>
            <div class="product-tabs-content sm:w-full w-11/12 mx-auto">
                <templete v-if="selectionTab === 1">
                    <p class="" v-html="product.Description"></p>
                </templete>
                <templete v-else-if="selectionTab === 2">
                    <ul class="additional-info">
                        <li>
                            <span>{{ t('page.productDetail.color') }}</span>
                            Gray, Green, Chocolate, Blue
                        </li>
                        <li>
                            <span>{{ t('page.productDetail.size') }}</span>
                            Semi Double, Double, Single
                        </li>
                        <li>
                            <span>{{ t('page.productDetail.material') }}</span>
                            Wood, Metal, Leather
                        </li>
                    </ul>
                </templete>
                <templete v-else-if="selectionTab === 3">
                    <div class="reviews lg:flex md:flex">
                        <div
                            class="lg:w-3/5 md:w-3/5 w-full px-3.5 lg:max-h-96 md:max-h-96 max-h-60 overflow-hidden overflow-y-auto"
                        >
                            <div class="d-flex m-b-15">
                                <Icon
                                    icon="carbon:user-avatar-filled-alt"
                                    width="80"
                                    height="80"
                                />
                                <div class="flex-1 m-l-8">
                                    <h3>White Lewis</h3>
                                    <base-rating-star
                                        :rating-type="'view'"
                                        :rating-point="4"
                                    />
                                    <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices ullarper euismod
                                        vehicula. Phasellus congue nulla.
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex m-b-15">
                                <Icon
                                    icon="carbon:user-avatar-filled-alt"
                                    width="80"
                                    height="80"
                                />
                                <div class="flex-1 m-l-8">
                                    <h3>White Lewis</h3>
                                    <base-rating-star
                                        :rating-type="'view'"
                                        :rating-point="4"
                                    />
                                    <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices ullarper euismod
                                        vehicula. Phasellus congue nulla.
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex m-b-15">
                                <Icon
                                    icon="carbon:user-avatar-filled-alt"
                                    width="80"
                                    height="80"
                                />
                                <div class="flex-1 m-l-8">
                                    <h3>White Lewis</h3>
                                    <base-rating-star
                                        :rating-type="'view'"
                                        :rating-point="4"
                                    />
                                    <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices ullarper euismod
                                        vehicula. Phasellus congue nulla.
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex m-b-15">
                                <Icon
                                    icon="carbon:user-avatar-filled-alt"
                                    width="80"
                                    height="80"
                                />
                                <div class="flex-1 m-l-8">
                                    <h3>White Lewis</h3>
                                    <base-rating-star
                                        :rating-type="'view'"
                                        :rating-point="4"
                                    />
                                    <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices ullarper euismod
                                        vehicula. Phasellus congue nulla.
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex m-b-15">
                                <Icon
                                    icon="carbon:user-avatar-filled-alt"
                                    width="80"
                                    height="80"
                                />
                                <div class="flex-1 m-l-8">
                                    <h3>White Lewis</h3>
                                    <base-rating-star
                                        :rating-type="'view'"
                                        :rating-point="4"
                                    />
                                    <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices ullarper euismod
                                        vehicula. Phasellus congue nulla.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="lg:w-2/5 md:w-2/5 w-full px-3.5 pt-4 lg:pt-0 md:pt-0"
                        >
                            <h3 class="text-3xl font-semibold mb-6 text-black">
                                {{ t('page.productDetail.addReview') }}
                            </h3>
                            <div class="w-full mb-3 d-flex">
                                <span class="mr-2 text-black"
                                    >{{ t('page.productDetail.yourRating') }}
                                </span>
                                <base-rating-star />
                            </div>
                            <div class="w-full mb-3">
                                <span class="mr-2 text-black"
                                    >{{ t('page.productDetail.message') }}
                                </span>
                                <base-text-area :config="textAreaConfig" />
                            </div>
                            <div class="w-full mb-3 d-flex">
                                <div class="w-1/2 mr-1">
                                    <span class="mr-2 text-black">{{
                                        t('page.productDetail.name')
                                    }}</span>
                                    <base-text-box :config="textBoxConfig" />
                                </div>
                                <div class="w-1/2">
                                    <span class="mr-2 text-black">Email</span>
                                    <base-text-box :config="textBoxConfig" />
                                </div>
                            </div>
                            <base-button :config="buttonCommentConfig" />
                        </div>
                    </div>
                </templete>
            </div>
        </div>
        <div
            class="lg:max-w-4xl md:max-w-screen-md container mx-auto mt-24 px-5"
        >
            <h2 class="mb-4 font-bold text-4xl">
                {{ t('page.productDetail.relatedProducts') }}
            </h2>
            <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                <div
                    class="mb-10"
                    v-for="product of dataProducts"
                    :key="product.ProductID"
                >
                    <base-product :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatCurrency, translateScreen } from '@/utils';
import {
    BaseButton,
    BaseNumberBox,
    BaseSelectBox,
    BaseRatingStar,
    BaseTextArea,
    BaseTextBox,
    BaseProduct,
    BaseBreadcrumbs,
} from '@/components/base';
import {
    textBoxConfig,
    textAreaConfig,
    sizeSelectBoxConfig,
    buttonCommentConfig,
    colorSelectBoxConfig,
    product,
} from '@/constants/components/base';
import { breadcrumbDetailsConfig } from '@/constants/views';
import ProductApi from '@/apis/product/product-api';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue3-i18n';
import { useRoute, useRouter } from 'vue-router';
import type { DxButton, DxNumberBox } from 'devextreme-vue';
import { onMounted } from 'vue';
import { useCartStore, useRecentStore } from '@/stores';
import { ProductModel } from '../../models';

// #region common
const { t } = useI18n();
const route = useRoute();
const cart = useCartStore();
const router = useRouter();

const recentStore = useRecentStore();
recentStore.addRecent(product.value);
// #endregion

// #region effects
onMounted(() => {
    translateScreen(440);
});
// #endregion

// #region handle events
let quantityPurchased: number = 0;

const numberBoxConfig: DxNumberBox = {
    max: product.value.Quantity,
    width: 130,
    height: 38,
    value: quantityPurchased,
};

const buttonConfig: DxButton = {
    width: 200,
    icon: 'fa-solid fa-cart-shopping',
    disabled: product.value.Quantity ? false : true,
    text: product.value.Quantity
        ? t('base.product.addToCart')
        : t('base.product.outOfStock'),
    onClick(e) {
        cart.addToCart(product.value);
        router.push({ name: 'cart' });
    },
};

function handleValueChange(value: number) {
    quantityPurchased = value;
}

const imageSrc = ref<string>(product.value.ProductImage[0]);
const selectImageIndex = ref<number>(0);

function handleChangeImage(change: string) {
    if (product.value.ProductImage.length < 0) return;
    if (change == 'next') {
        selectImageIndex.value < product.value.ProductImage.length - 1
            ? selectImageIndex.value++
            : selectImageIndex.value;
    } else if (change == 'back') {
        selectImageIndex.value > 0
            ? selectImageIndex.value--
            : selectImageIndex.value;
    }
    imageSrc.value = product.value.ProductImage[selectImageIndex.value];
}

function setSelectedImage(index: number) {
    selectImageIndex.value = index;
    imageSrc.value = product.value.ProductImage[selectImageIndex.value];
}

const selectionTab = ref<number>(1);

function handleChangeTab(tab: number) {
    selectionTab.value = tab;
}

const dataProducts = ref<ProductModel[]>([]);
const productApi = new ProductApi();

watch(
    () => route.params.id,
    (newVal) => {
        dataProducts.value = productApi.getRelatedProduct().slice(0, 4);
    },
    {
        immediate: true,
    }
);
// #endregion
</script>

<style lang="scss" scoped>
label {
    margin-bottom: 3px;
    font-weight: 600;
    color: var(--app-color-text-product);
}
.product-img {
    height: 400px;
    position: relative;
    &:hover {
        .control-left,
        .control-right {
            display: flex;
        }
    }
    .control-left,
    .control-right {
        position: absolute;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        display: none;
        left: 8px;
        top: 192px;
        transition: all 0.4s ease 0s;
        color: var(--app-color-white);
        color: var(--app-color-text-product);
        &:hover {
            cursor: pointer;
            background-color: var(--app-color-primary);
            color: var(--app-color-white);
        }
    }
    .control-right {
        left: unset;
        right: 8px;
    }
}
.product-list-img {
    width: 330px;
    display: flex;
    height: auto;
    margin-top: 10px;
    img:hover {
        cursor: pointer;
        border: 1px solid var(--app-color-primary);
    }
}
.active {
    border: 1px solid var(--app-color-primary);
}
.product-detail {
    margin-right: auto;
    margin-left: auto;
    .product-content {
        padding-left: 15px;
        padding-right: 15px;
        .product-detail-name {
            line-height: 1;
            font-size: 24px;
            margin: 14px 0px 12px;
            font-weight: 600;
            color: var(--app-color-text-product);
        }
        .product-detail-price {
            font-size: 22px;
            margin-top: 14px;
            margin-bottom: 20px;
            color: var(--app-color-text-product);
        }
        .price-old {
            margin-right: 5px;
            color: var(--app-color-price-old-product);
        }
        .product-detail-description {
            margin-bottom: 20px;
            font-size: 16px;
            text-align: justify;
        }
        .product-detail-cart {
            display: flex;
        }
        .product-detail-feature {
            margin-top: 20px;
            display: flex;
            cursor: pointer;
            .add-to-wishlist,
            .add-to-compare {
                &:hover {
                    color: var(--app-color-primary);
                }
            }
        }
        .product-detail-social {
            margin-top: 12px;
            display: flex;
            align-items: center;
            & a {
                margin-left: 16px;
                font-size: 18px;
                display: inline-block;
                color: var(--app-color-black);
                &:hover {
                    color: var(--app-color-primary);
                }
            }
        }
    }
}
.product-tabs {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    .tab {
        cursor: pointer;
        position: relative;
        padding-bottom: 15px;
        font-weight: 600;
        transition: all 0.4s ease 0s;
        color: var(--app-color-text-product);
        &::after {
            content: '';
            left: 0px;
            right: 0px;
            height: 2px;
            bottom: -1px;
            position: absolute;
            transition: all 0.4s ease 0s;
        }
    }
}
.selected-tab.tab::after {
    background: var(--app-color-primary);
}
.product-tabs-content {
    min-width: 40px;
    max-height: 800px;
    overflow: hidden;
    line-height: 24px;
    text-align: left;
    padding: 30px;
    border: 1px solid var(--app-color-border-lighter);
    .additional-info {
        li:not(:last-child) {
            margin-bottom: 13px;
        }
        span {
            min-width: 70px;
            margin: 0px 26px 0px 0px;
            display: inline-block;
            font-weight: 500;
            color: var(--app-color-text-product);
        }
    }
    .reviews {
        flex-wrap: wrap;
        margin-right: calc(-15px);
        margin-left: calc(-15px);
    }
}
</style>
