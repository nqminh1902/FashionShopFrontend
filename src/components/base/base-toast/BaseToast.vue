<template>
    <dx-toast v-bind="toastConfig" />
</template>

<script setup lang="ts">
import { defaultBaseToastConfig } from '@/constants/components/base';
import { useToastStore } from '@/stores';
import { mergeObjects } from '@/utils';
import { DxToast } from 'devextreme-vue/toast';

// #region common
const props = defineProps<{
    config: DxToast;
}>();

const toastConfig: DxToast = mergeObjects(defaultBaseToastConfig, props.config);
// #endregion

watch(
    () => toastConfig.visible,
    (currentValue) => {
        if (!currentValue) useToastStore().toggleToast(false);
    },
    {
        deep: true,
    }
);
</script>

<style lang="scss"></style>
