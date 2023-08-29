<template>
    <div id="cart" class="w-full mx-auto">
        <base-breadcrumbs :config="breadcrumbCartConfig" />
        <div
            class="lg:max-w-screen-lg md:max-w-screen-md px-3.5 mx-auto overflow-x-auto"
        >
            <table class="w-full">
                <thead class="table-header">
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-for="product of cartList" :key="product.ProductID">
                        <td>
                            <img
                                :src="product.ProductImage[0]"
                                class="w-28 h-28"
                                alt=""
                            />
                        </td>
                        <td>
                            <router-link to="">{{
                                product.ProductName
                            }}</router-link>
                        </td>
                        <td>
                            <span>{{ formatCurrency(product.Price) }}</span>
                        </td>
                        <td>
                            <div class="w-full justify-center d-flex">
                                <base-number-box
                                    :config="numberBoxCartConfig"
                                    v-model="product.QuantityBuy"
                                />
                            </div>
                        </td>
                        <td>
                            <span>{{
                                formatCurrency(
                                    product.Price * product.QuantityBuy
                                )
                            }}</span>
                        </td>
                        <td>
                            <div class="d-flex justify-center d-flex">
                                <Icon
                                    icon="lucide:edit"
                                    width="18"
                                    height="18"
                                    class="mr-1.5 cursor-pointer"
                                />
                                <Icon
                                    icon="zondicons:close-outline"
                                    width="18"
                                    height="18"
                                    class="cursor-pointer"
                                    @click="
                                        handleRemoveFromCart(product.ProductID)
                                    "
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            class="lg:max-w-screen-lg md:max-w-screen-md px-3.5 mx-auto table-footer"
        >
            <div class="total">
                {{ t("page.cart.total")
                }}<span>{{ formatCurrency(price) }}</span>
            </div>
        </div>
        <div
            class="lg:max-w-screen-lg md:max-w-screen-md px-3.5 mx-auto mt-10 d-flex cart-footer"
        >
            <div class="flex-1 d-flex">
                <base-text-box :config="textboxConfig" class="flex-1" />
                <base-button ref="btnCouponRef" :config="couponBtnConfig" />
            </div>
            <div class="flex-1 d-flex justify-end">
                <base-button
                    ref="btnClearRef"
                    :config="clearBtnConfig"
                    class="mr-1.5"
                />
                <base-button ref="btnCheckoutRef" :config="checkoutBtnConfig" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BaseBreadcrumbs,
    BaseNumberBox,
    BaseButton,
    BaseTextBox,
} from "@/components/base";
import {
    breadcrumbCartConfig,
    numberBoxCartConfig,
    textboxConfig,
    couponBtnConfig,
} from "@/constants/views";
import { formatCurrency } from "@/utils";
import { Icon } from "@iconify/vue";
import { DxButton } from "devextreme-vue";
import { ButtonType } from "@/enums";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useI18n } from "vue3-i18n";
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";

// #region common
const { t, getLocale } = useI18n();
const cart = useCartStore();
const router = useRouter();
const { cartList, totalPrice } = storeToRefs(cart);

const price = computed(() => {
    totalPrice.value = cartList.value.reduce((total, product) => {
        return total + product.Price * product.QuantityBuy;
    }, 0);

    return totalPrice.value;
});
// #endregion

// #region config
const checkoutBtnConfig = ref<DxButton>({
    text: t("page.cart.paymentProcess"),
    height: 48,
    type: ButtonType.normal,
    onClick(e) {
        router.push({ name: "checkout" });
    },
});

const clearBtnConfig: DxButton = {
    text: t("page.cart.deleteCart"),
    height: 48,
    onClick(e) {
        cart.removeAllProducts();
    },
};
// #endregion

// #region handle events
watch(
    () => price.value,
    () => {
        cart.totalPriceChange();
    }
);

function handleRemoveFromCart(id: number) {
    cart.removeFromCart(id);
}
// #endregion

// #region localize
const btnCouponRef = ref<InstanceType<typeof DxButton>>();
const btnClearRef = ref<InstanceType<typeof DxButton>>();
const btnCheckoutRef = ref<InstanceType<typeof DxButton>>();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            btnCouponRef.value
                ?.getInstance()
                ?.option("text", t("page.cart.coupon"));
            btnClearRef.value
                ?.getInstance()
                ?.option("text", t("page.cart.deleteCart"));
            btnCheckoutRef.value
                ?.getInstance()
                ?.option("text", t("page.cart.paymentProcess"));
        }
    }
);
// #endregion
</script>

<style lang="scss" scoped>
tr {
    border-bottom: 1px solid var(--app-color-border-lighter);
}
.table-header {
    th {
        white-space: nowrap;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 700;
        border: none !important;
        text-align: center !important;
        padding: 21px 45px 22px !important;
        color: var(--app-color-text-product);
        background-color: var(--app-color-background);
    }
}
.table-body {
    td {
        padding: 0.75rem;
        text-align: center;
        border: none !important;
        vertical-align: middle !important;
    }
}
.table-footer {
    padding: 0.75rem;
    vertical-align: top;
    border-bottom: 1px solid var(--app-color-background);
    .total {
        font-size: 16px;
        font-weight: 700;
        min-width: 200px;
        display: flex;
        margin-right: 35px;
        -webkit-box-pack: end;
        justify-content: flex-end;
        color: var(--app-color-secondary);
        span {
            margin-left: 40px;
            color: var(--app-color-text-product);
        }
    }
}
.cart-footer {
    padding: 20px;
    margin-bottom: 80px;
    background-color: var(--app-color-background);
}
</style>

<style lang="scss">
.cart-footer {
    .dx-texteditor.dx-editor-outlined {
        border-radius: 0px;
        border: 1px solid var(--app-color-secondary);
    }
}
</style>
