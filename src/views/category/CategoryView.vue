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
                v-if="productsData.length > 0"
            >
                <div
                    class="mb-10"
                    v-for="product of productsData"
                    :key="product.ProductID"
                >
                    <base-product :product="product" />
                </div>
            </div>
            <div v-else>
                <the-empty />
            </div>
            <base-navigation
                :total-record="totalRecord"
                v-if="productsData.length > 0"
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
import { CategoryModel, PagingRequest, ProductModel } from "../../models";
import ProductApi from "@/apis/product/product-api";
import type { BaseFilterType } from "@/types";
import { useI18n } from "vue3-i18n";
import { onMounted, ref, watch } from "vue";
import { translateScreen } from "@/utils";
import { TheEmpty } from "@/components/component";
import type { BaseBreadcrumbType } from '@/types';
import CategoryApi from "../../apis/category/category-api";


// #region common
const productsData = ref<ProductModel[]>([]);
const productApi = new ProductApi();
const categoryApi = new CategoryApi();
const filterPaging = new PagingRequest();
const totalRecord = ref<number>(0)
const category = ref<CategoryModel>(new CategoryModel())
const { t, getLocale } = useI18n();

const breadcrumbConfig = ref<BaseBreadcrumbType>({
    currentPage: category.value.CategoryName,
});
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
    async (newVal) => {
        if (newVal) {
            filterPaging.CustomFilter = btoa(`[["CategoryID", "=", "${newVal}"]]`)
            const res = await productApi.getFilterPaging(
                filterPaging
            );
            if(res){
                productsData.value = res.data.Data.Data
                totalRecord.value = res.data.Data.TotalCount
            }else{
                
            }
            const resCollection = await categoryApi.getByID(+newVal)
            if(resCollection){
                category.value = resCollection.data.Data
                breadcrumbConfig.value.currentPage = category.value.CategoryName
                
            }else{
                
            }
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
