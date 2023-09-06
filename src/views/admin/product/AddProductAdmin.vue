<template>
    <div id="category-admin" class="w-full h-full px-6 pt-6 pb-3">
        <div class="bg-white w-full h-full rounded-lg">
            <div class="content-title">
                <Icon
                    :icon="'majesticons:arrow-left'"
                    width="24"
                    height="24"
                    class="mx-6 cursor-pointer"
                    @click="backPage"
                />
                <div class="text-3xl">Thêm sản phẩm</div>
            </div>
            <div class="product-form">
                <dx-scroll-view :height="'100%'">
                    <div class="flex">
                        <div class="flex-1 pr-4">
                            <div class="field">
                                <div class="lable">
                                    Mã sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="codeConfig"
                                    class="mb-6"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Tên sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="nameConfig"
                                    class="mb-6"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Giá sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-number-box 
                                    :config="priceConfig"
                                    class="mb-6" 
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Chất liệu sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="materialConfig"
                                    class="mb-6"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Bộ sưu tập sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="collectionConfig" />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Danh mục sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="categoryConfig" />
                            </div>
                        </div>
                        <div class="flex-1 pl-4">
                            <div class="field">
                                <div class="lable">
                                    Hình ảnh sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-upload-image :list-image="imageColor" :allow-multiple="true" @on-upload="handleUploadFile" @on-delete="handleDeleteFile"/>
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Mô tả nhanh<span style="color: red"> *</span>
                                </div>
                                <base-text-area :config="textAreaConfig" />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Trạng thái<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="statusConfig" />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Mô tả<span style="color: red"> *</span>
                                </div>
                                <DxHtmlEditor v-bind="htmlEditerConfig">
                                    <DxToolbar :multiline="true">
                                        <DxItem name="undo" />
                                        <DxItem name="redo" />
                                        <DxItem name="separator" />
                                        <DxItem
                                            name="size"
                                            :accepted-values="sizeValues"
                                        />
                                        <DxItem
                                            name="font"
                                            :accepted-values="fontValues"
                                        />
                                        <DxItem name="separator" />
                                        <DxItem name="bold" />
                                        <DxItem name="italic" />
                                        <DxItem name="strike" />
                                        <DxItem name="underline" />
                                        <DxItem name="separator" />
                                        <DxItem name="alignLeft" />
                                        <DxItem name="alignCenter" />
                                        <DxItem name="alignRight" />
                                        <DxItem name="alignJustify" />
                                        <DxItem name="separator" />
                                        <DxItem name="orderedList" />
                                        <DxItem name="bulletList" />
                                        <DxItem name="separator" />
                                        <DxItem
                                            name="header"
                                            :accepted-values="headerValues"
                                        />
                                        <DxItem name="separator" />
                                        <DxItem name="color" />
                                        <DxItem name="background" />
                                        <DxItem name="separator" />
                                        <DxItem name="link" />
                                        <DxItem name="image" />
                                        <DxItem name="separator" />
                                        <DxItem name="clear" />
                                    </DxToolbar>
                                    <DxTableContextMenu :enabled="true" />
                                    <DxMediaResizing :enabled="true" />
                                </DxHtmlEditor>
                            </div>
                        </div>
                    </div>
                    <div class="flex py-4 justify-between">
                        <div class="text-3xl">Biến thể sản phẩm</div>
                        <base-button :config="buttonConfig" />
                    </div>
                    <div class="flex py-4 table-grid">
                        <base-table ref="tableRef" :config="tableConfig" :is-show-custom-button="false">
                            <template #status="data">
                                <base-number-box :config="quantityConfig" v-model="data.data.data.Quantity"/>
                            </template>
                        </base-table>
                    </div>
                </dx-scroll-view>
            </div>    
        </div>
        <popup-add-variant v-if="isShowPopup" :visible="isShowPopup" :product-variant="listProductVariant" @on-close="isShowPopup = false" @on-save="handleSaveVariant"/>
    </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { DxButton, DxDataGrid, DxNumberBox, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import PopupAddVariant from "./PopupAddVariant.vue" 
import { DxScrollView } from "devextreme-vue/scroll-view";
import CategoryApi from "../../../apis/category/category-api";
import CollectionApi from "@/apis/collection/collection-api";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    BaseNumberBox,
    BaseTable,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
    BaseUploadImage,
    BaseTextArea
} from "../../../components/base";
import CustomStore from "devextreme/data/custom_store";
import { ProductImageModel, ProductModel } from "../../../models";
import { useI18n } from "vue3-i18n";
import {
    DxToolbar,
    DxItem,
    DxHtmlEditor,
    DxTableContextMenu,
    DxMediaResizing
} from 'devextreme-vue/html-editor';
import { ButtonStylingMode, ButtonType } from "@/enums";
import type { ProductVariantModel } from "@/models/ProductVariants";
const route = useRoute()
const router = useRouter()
const categoryApi = new CategoryApi();
const collectionApi = new CollectionApi();
const codeConfig = ref<DxTextBox>({})
const nameConfig = ref<DxTextBox>({})
const priceConfig = ref<DxNumberBox>({
    min: 0
})
const quantityConfig = ref<DxNumberBox>({
    height: 30,
    min: 0,
    showSpinButtons: false
})
const product = ref(new ProductModel())
const materialConfig = ref<DxTextBox>({})
const isShowPopup = ref(false)
const listProductVariant = ref<ProductVariantModel[]>([])

const { t } = useI18n();
const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
const fontValues = ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana']
const headerValues = [false, 1, 2, 3, 4, 5]

const dataSourceCategory = new CustomStore({
    key: "CategoryID",
    async load(loadOptions) {
        const res = await categoryApi.getAll();
        return res.data.Data.Data || [];
    },
    loadMode: "raw",
})


const categoryConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn trạng thái',
    valueExpr: 'CategoryID',
    displayExpr: 'CategoryName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceCategory,
    onSelectionChanged(e: any) {
    },
});

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm biến thể",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        isShowPopup.value = true
        console.log(product.value.ProductVariants);
        
    },
});

const tableConfig = ref<DxDataGrid>({
    columns: [
        {
            alignment: "left",
            caption: "Kích cỡ",
            dataField: "ProductSizeName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Màu sắc",
            dataField: "ProductColorName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Số lượng",
            dataField: "Quantity",
            dataType: "number",
            cellTemplate: "status-template"
        },
    ],
    dataSource: [],
    keyExpr: "ProductVariantID",
    onSelectionChanged(e) {
        console.log(e);
    },
})

const tableRef = ref<InstanceType<typeof DxDataGrid>>();

const htmlEditerConfig = ref<DxHtmlEditor>({
    allowSoftLineBreak: true,
    height: 500,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    onValueChanged(e) {
        console.log(e);
        
    },
})

const dataSourceCollection = new CustomStore({
    key: "CollectionID",
    async load(loadOptions) {
        const res = await collectionApi.getAll();
        return res.data.Data.Data || [];
    },
    loadMode: "raw",
})

const collectionConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn bộ sưu tập',
    valueExpr: 'CollectionID',
    displayExpr: 'CollectionName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceCollection,
    onSelectionChanged(e: any) {
    },
});

const statusConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn trạng thái',
    noDataText: 'Không có dữ liệu',
    displayExpr: "name",
    valueExpr: "id",
    dataSource: [
        {
            id: 0,
            name: "Không kích hoạt",
        },
        {
            id: 1,
            name: "Kích hoạt",
        },
        {
            id: 2,
            name: "Hết hàng",
        },
    ],
    searchEnabled: false,
    onValueChanged: (e) => {},
});

const textAreaConfig: DxTextArea = {
    height: 96,
    maxHeight: 96,
    placeholder: t('base.textArea.message'),
};

function backPage(){
    router.go(-1)
}

const imageColor = ref<ProductImageModel[]>([])

function handleUploadFile(image: ProductImageModel){
    imageColor.value.push(image)
}

function handleDeleteFile(image: ProductImageModel[]){
    imageColor.value = image
}

function handleSaveVariant(variants: ProductVariantModel[]){
    isShowPopup.value = false
    product.value.ProductVariants = variants
    tableRef.value.getInstance().option("dataSource", product.value.ProductVariants)
}
</script>
<style lang="scss" scoped>
.content-title {
    display: flex;
    width: 100%;
    height: 48px;
    align-items: center;
    line-height: 1.25;
}
.product-form{
    height: calc(100% - 48px);
    width: 100%;
    padding: 0 16px 16px;

}
.table-grid{
    width: 100%;
    height: 300px;
}
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>
