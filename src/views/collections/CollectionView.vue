<template>
    <div id="collection" class="w-full">
        <base-breadcrumbs :config="breadcrumbConfig" />
        <div class="container mx-auto">
            <base-filter
                :config="filterConfig"
                @on-search-value-changed="handleSearchFilter"
                @on-select-value-changed="handleFilterChange"
            />
            <div
                class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5"
                v-if="dataProducts.length > 0"
            >
                <div
                    class="mb-10"
                    v-for="product of dataProducts"
                    :key="product.ProductID"
                >
                    <base-product :product="product" />
                </div>
            </div>
            <div v-else>
                <the-empty />
            </div>
            <base-navigation
                :total-record="100"
                v-if="dataProducts.length > 0"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BaseProduct,
    BaseFilter,
    BaseBreadcrumbs,
    BaseNavigation,
} from "@/components/base";
import { useRoute } from "vue-router";
import { ProductModel } from "../../models";
import ProductApi from "@/apis/product/product-api";
import { breadcrumbConfig } from "@/constants/views";
import type { BaseFilterType } from "@/types";
import { useI18n } from "vue3-i18n";
import { onMounted, ref, watch } from "vue";
import { translateScreen } from "@/utils";
import { TheEmpty } from "@/components/component";

// #region common
const dataProducts = ref<ProductModel[]>([]);
const productApi = new ProductApi();
const { t } = useI18n();
// #endregion

// #region effects
onMounted(() => {
    translateScreen(180);
});
// #endregion

// #region router
const route = useRoute();

watch(
    () => route.params.id,
    (newVal) => {
        if (newVal) {
            dataProducts.value = productApi.getByCollectionID(
                newVal.toString()
            );
        }
    },
    {
        immediate: true,
    }
);
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
#collection {
    margin-bottom: 80px;
}
</style>
