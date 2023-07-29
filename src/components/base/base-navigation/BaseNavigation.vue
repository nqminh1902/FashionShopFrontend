<template>
    <div class="base-navigation">
        <div class="navigation-left">
            <div class="total">
                {{ t('navigation.total') }}
                <span class="total-text">{{ navigation.total }}</span>
                {{ t('navigation.record') }}
            </div>
        </div>
        <div class="navigation-right d-flex-center">
            <div class="record-per-page d-flex-center m-r-15">
                <span class="m-r-4"
                    >{{ t('navigation.numberOfRecords') }}{{ t('sign.slash')
                    }}{{ t('navigation.page') }}</span
                >
                <base-select-box
                    v-model="navigation.pageSize"
                    :config="selectBoxConfig"
                />
            </div>
            <div class="from-to-record m-r-15">
                {{ fromNumber }}{{ t('sign.dash') }}{{ toNumber }}
                {{ t('navigation.record') }}
            </div>
            <div class="controls d-flex-center">
                <div
                    class="previous cpointer m-r-10"
                    @click="handleChangePage(false)"
                >
                    <Icon icon="ooui:next-rtl" />
                </div>
                <div class="next cpointer" @click="handleChangePage()">
                    <Icon icon="ooui:next-ltr" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DxSelectBox } from 'devextreme-vue';
import { BaseSelectBox } from '..';
import { useI18n } from 'vue3-i18n';
import type { BaseNavigationType } from '@/types';
import { Icon } from '@iconify/vue';

// #region common
const { t } = useI18n();

const emit = defineEmits<{
    (e: 'nextPage'): void;
    (e: 'previosPage'): void;
    (e: 'changePageSize'): void;
}>();

const navigation = ref<BaseNavigationType>({
    pageIndex: 1,
    pageSize: 10,
    total: 20,
});

const fromNumber = ref<number>(
    navigation.value.total === 0 ? 0 : navigation.value.pageIndex
);

const toNumber = ref<number>(
    navigation.value.total > navigation.value.pageSize
        ? navigation.value.pageSize
        : navigation.value.total
);
// #endregion

// #region config
const selectBoxConfig = ref<DxSelectBox>({
    width: 90,
    dataSource: [10, 25, 50, 100],
    searchEnabled: false,
    onValueChanged: (e) => {
        navigation.value.pageSize = 1;
        navigation.value.pageSize = e.value;
        emit('changePageSize');
    },
});
// #endregion

// #region handle change page
const handleChangePage = (isNextPage: boolean = true) => {
    if (isNextPage) {
        if (
            navigation.value.pageIndex * navigation.value.pageSize + 1 <
            navigation.value.total
        ) {
            navigation.value.pageIndex += 1;
            fromNumber.value += navigation.value.pageSize;
            if (
                toNumber.value + navigation.value.pageSize <
                navigation.value.total
            ) {
                toNumber.value += navigation.value.pageSize;
            } else {
                toNumber.value = navigation.value.total;
            }
        }
        emit('nextPage');
    } else {
        if (navigation.value.pageIndex > 1) {
            navigation.value.pageIndex -= 1;
            if (fromNumber.value - navigation.value.pageSize >= 1) {
                fromNumber.value -= navigation.value.pageSize;
            }
            if (
                toNumber.value - navigation.value.pageSize >=
                navigation.value.pageSize
            )
                toNumber.value -= navigation.value.pageSize;
        }
        emit('previosPage');
    }
};
// #endregion
</script>

<style lang="scss" scoped>
.base-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    padding: 10px 20px;
    margin-top: 40px;
    background-color: var(--app-color-background);
    .controls {
        .previous,
        .next {
            padding: 6px;
            &:hover {
                border-radius: 50%;
                color: var(--app-color-white);
                background-color: var(--app-color-primary);
            }
        }
    }
}
</style>
