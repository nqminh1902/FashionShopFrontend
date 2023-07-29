<template>
    <div id="recent" class="w-full">
        <base-breadcrumbs :config="breadcrumbRecentConfig" />
        <div class="container mx-auto">
            <div
                v-if="dataProducts.length > 0"
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
            <div v-else>
                <the-empty />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BaseProduct, BaseBreadcrumbs } from '@/components/base';
import { TheEmpty } from '@/components/component';
import { ProductModel } from '../../models';
import { breadcrumbRecentConfig } from '@/constants/views';
import { useI18n } from 'vue3-i18n';
import { onMounted, type Ref } from 'vue';
import { translateScreen } from '@/utils';
import { useRecentStore } from '@/stores';

// #region common
const recentStore = useRecentStore();
const dataProducts = <Ref<readonly ProductModel[]>>recentStore.getRecent();
const { t } = useI18n();
// #endregion

// #region effects
onMounted(() => {
    translateScreen(180);
});
// #endregion
</script>

<style lang="scss" scoped>
#recent {
    margin-bottom: 80px;
}
</style>
