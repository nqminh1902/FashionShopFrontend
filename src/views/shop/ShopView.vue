<template>
    <div id="shop" class="w-full">
        <base-breadcrumbs :config="breadcrumbShopConfig" />
        <div class="container mx-auto">
            <base-filter
                :config="filterConfig"
                @on-search-value-changed="handleSearchFilter"
                @on-select-value-changed="handleFilterChange"
            />
            <div
                class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5"
            >
                <div
                    class="mb-10"
                    v-for="product of dataProducts"
                    :key="product.ProductID"
                >
                    <base-product :product="product" />
                </div>
            </div>
            <base-navigation />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BaseProduct,
    BaseFilter,
    BaseBreadcrumbs,
    BaseNavigation,
} from '@/components/base';
import { ProductModel } from '../../models';
import ProductApi from '@/apis/product/product-api';
import { breadcrumbShopConfig } from '@/constants/views';
import type { BaseFilterType } from '@/types';
import { useI18n } from 'vue3-i18n';
import { onMounted } from 'vue';
import { translateScreen } from '@/utils';

// #region common
const productApi = new ProductApi();
const dataProducts = ref<ProductModel[]>(productApi.get());
const { t } = useI18n();
// #endregion

// #region effects
onMounted(() => {
    translateScreen(180);
});
// #endregion

// #region config
const filterConfig = ref<BaseFilterType>({
    selectBoxConfig: {},
});
// #endregion

// #region handle events emit
const handleSearchFilter = (value: any) => {
    console.log(value);
};

const handleFilterChange = (value: any) => {
    console.log(value);
};
// #endregion
</script>

<style lang="scss" scoped>
#shop {
    margin-bottom: 80px;
}
</style>
