<template>
    <div id="orders">
        <base-breadcrumbs :config="breadcrumbOrdersConfig" />
        <div class="container mx-auto">
            <base-filter
                :config="filterConfig"
                @on-search-value-changed="handleSearchFilter"
                @on-select-value-changed="handleFilterChange"
            />
            <div class="orders-wrapper d-flex-center">
                <div
                    v-for="(item, index) of ordersData.dataSource"
                    :key="index"
                >
                    <base-order-item :config="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ordersData } from '@/mocks';
import { BaseBreadcrumbs, BaseFilter, BaseOrderItem } from '@/components/base';
import { breadcrumbOrdersConfig } from '@/constants/views';
import type { BaseFilterType } from '@/types';
import { translateScreen } from '@/utils';
import { onMounted } from 'vue';
import { useI18n } from 'vue3-i18n';

// #region common
const { t, getLocale } = useI18n();
// #endregion

// #region config
const filterConfig = ref<BaseFilterType>({
    textSelectBox: t('page.orders.status'),
    selectBoxConfig: {
        dataSource: [
            t('page.orders.delivery'),
            t('page.orders.delivered'),
            t('page.orders.canceled'),
        ],
    },
});
// #endregion

// #region effects
onMounted(() => {
    translateScreen(180);
});

const handleSearchFilter = (value: any) => {
    console.log(value);
};

const handleFilterChange = (value: any) => {
    console.log(value);
};
// #endregion
</script>

<style lang="scss" scoped>
#orders {
    .orders-wrapper {
        justify-content: space-between;
    }
}
</style>
