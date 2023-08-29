<template>
    <router-view></router-view>
    <base-toast ref="toastRef" :config="toastConfig" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { BaseToast } from "./components/base";
import { useToastStore } from "./stores/toast";
import type { DxToast } from "devextreme-vue";
import { ToastType } from "./enums";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

const toastConfig = ref<DxToast>({
    type: ToastType.success,
    message: "Success!",
});
</script>

<style lang="scss" scoped></style>
