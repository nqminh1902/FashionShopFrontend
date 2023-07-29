<template>
    <base-breadcrumbs :config="breadcrumbDashboardConfig" />
    <div id="dashboard"></div>
</template>

<script setup lang="ts">
import { BaseBreadcrumbs } from '@/components/base';
import { breadcrumbDashboardConfig } from '@/constants/views';
</script>

<style lang="scss" scoped>
#dashboard {
    padding: 0 80px;
}
</style>
