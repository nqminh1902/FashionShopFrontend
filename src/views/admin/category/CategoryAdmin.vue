<template>
    <div id="category-admin" class="w-full h-full px-6 pt-6 pb-3">
        <div class="bg-white w-full h-full rounded-lg">
            <div class="content-title">
                <Icon
                    :icon="'tabler:category'"
                    :color="'#2563eb'"
                    width="24"
                    height="24"
                    class="mx-6"
                />
                <div class="text-3xl">Danh mục sản phẩm</div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
            </div>
            <div class="grid">
                <base-table :config="tableConfig" ref="baseTableRef">
                    <template #status="data">
                        <base-status :status="data.data.data.Status" />
                    </template>
                </base-table>
            </div>
            <base-navigation
                :totalRecord="totalCount"
                @onNavigationChange="pagingChange"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue3-i18n";
import {
    BaseTable,
    BasePaging,
    BaseNavigation,
    BaseTextBox,
    BaseStatus,
} from "../../../components/base";
import { Icon } from "@iconify/vue";
import type { DxDataGrid } from "devextreme-vue";
import { ref } from "vue";
import CustomStore from "devextreme/data/custom_store";
import CategoryApi from "../../../apis/category/category-api";
import { PagingRequest } from "../../../models";
import type { BaseNavigationType } from "@/types";
import type DxTextBox from "devextreme-vue/text-box";

const { t, getLocale, setLocale } = useI18n();
const categoryApi = new CategoryApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref();

const dataSource = new CustomStore({
    key: "CategoryID",
    async load(loadOptions) {
        filterPaging.Collums = ["CategoryName"];
        const res = await categoryApi.getFilterPaging(filterPaging);
        if (res) {
            totalCount.value = res.data.Data.TotalCount;
        }
        return res.data.Data.Data || [];
    },
    loadMode: "processed",
});

const tableConfig = ref<DxDataGrid>({
    columns: [
        {
            alignment: "left",
            caption: "Tên danh mục",
            dataField: "CategoryName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Trạng thái",
            dataField: "Status",
            dataType: "number",
            width: 150,
            cellTemplate: "status-template",
        },
    ],
    dataSource: dataSource,
    keyExpr: "CategoryID",
    onSelectionChanged(e) {
        console.log(e);
    },
});

const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: t("base.general.typeValue"),
    buttons: [
        {
            name: "BtnSearch",
            location: "before",
            options: {
                icon: "search",
            },
        },
    ],
    onValueChanged: (e) => {
        filterPaging.SearchValue = e.value;
        filterPaging.PageIndex = 1;
        baseTableRef.value.getInstance().refresh();
    },
};

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value.getInstance().refresh();
}
</script>

<style lang="scss">
#category-admin {
    .content-title {
        display: flex;
        width: 100%;
        height: 48px;
        align-items: center;
        line-height: 1.25;
    }
    .toolbar {
        height: 48px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
    }
    .grid {
        width: 100%;
        padding: 0 16px;
        height: calc(100% - 48px - 48px - 46px);
    }
}
</style>
