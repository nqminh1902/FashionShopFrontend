<template>
    <base-breadcrumbs :config="breadcrumbCheckoutConfig" />
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pb-16">
        <div class="px-4 pt-8">
            <p class="text-xl font-medium">Tổng đơn hàng</p>
            <p class="text-gray-400">
                Kiểm tra các mặt hàng và chọn hình thức thanh toán
            </p>
            <div
                class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
            >
                <div
                    class="flex flex-col rounded-lg bg-white sm:flex-row"
                    v-for="product of cartList"
                    :key="product.ProductID"
                >
                    <img
                        class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        :src="product.ProductImage"
                        alt=""
                    />
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">{{
                            product.ProductName
                        }}</span>
                        <span class="float-right text-gray-400">{{
                            product.QuantityBuy
                        }}</span>
                        <p class="text-lg font-bold">
                            {{
                                formatCurrency(
                                    product.QuantityBuy * product.Price
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>
            <p class="mt-8 text-lg font-medium">Hình thức thanh toán</p>
            <form class="mt-5 grid gap-6">
                <div class="relative option">
                    <input
                        class="peer hidden"
                        id="radio_1"
                        type="radio"
                        name="radio"
                        checked
                    />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
                    ></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1"
                    >
                        <img
                            class="w-14 object-contain"
                            src="https://sohala.vn/upload/news/thanh-toan-khi-nhan-hang-6272.jpg"
                            alt=""
                        />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold"
                                >Thanh toán khi nhận hàng</span
                            >
                            <p class="text-slate-500 text-sm leading-6">
                                Delivery: 2-4 Days
                            </p>
                        </div>
                    </label>
                </div>
                <div class="relative option">
                    <input
                        class="peer hidden"
                        id="radio_2"
                        type="radio"
                        name="radio"
                        checked
                    />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
                    ></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_2"
                    >
                        <img
                            class="w-14 object-contain"
                            src="https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png"
                            alt=""
                        />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold"
                                >Thanh toán MoMo</span
                            >
                            <p class="text-slate-500 text-sm leading-6">
                                Delivery: 2-4 Days
                            </p>
                        </div>
                    </label>
                </div>
                <div class="relative option">
                    <input
                        class="peer hidden"
                        id="radio_3"
                        type="radio"
                        name="radio"
                        checked
                    />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
                    ></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_3"
                    >
                        <img
                            class="w-14 object-contain"
                            src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png"
                            alt=""
                        />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold"
                                >Thanh toán VNpay</span
                            >
                            <p class="text-slate-500 text-sm leading-6">
                                Delivery: 2-4 Days
                            </p>
                        </div>
                    </label>
                </div>
            </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Thông tin giao hàng</p>
            <p class="text-gray-400">
                Hoàn thành đơn hàng của bạn bằng cách công cấp đầy đủ thông tin
                bên dưới
            </p>
            <div class="">
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Họ và tên</label
                >
                <div class="relative">
                    <base-text-box
                        :config="fullNameConfig"
                        v-model="delivery.UserName"
                    />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Email</label
                >
                <div class="relative">
                    <base-text-box
                        :config="emailConfig"
                        v-model="delivery.Email"
                    />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Số điện thoại</label
                >
                <div class="relative">
                    <base-number-box
                        :config="mobileConfig"
                        v-model="delivery.MobilePhone"
                    />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Tỉnh/Thành phố</label
                >
                <div class="relative">
                    <base-select-box :config="cityConfig" />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Quận/Huyện</label
                >
                <div class="relative">
                    <base-select-box
                        :config="districtConfig"
                        ref="districtRef"
                    />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Phường/Xã</label
                >
                <div class="relative">
                    <base-select-box :config="wardConfig" ref="wardRef" />
                </div>
                <label for="email" class="mt-4 mb-2 block text-sm font-medium"
                    >Địa chỉ nhà</label
                >
                <div class="relative">
                    <base-text-box
                        :config="addressConfig"
                        v-model="delivery.Address"
                    />
                </div>
                <!-- Total -->
                <div class="mt-6 border-t border-b py-2">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">
                            Tổng đơn
                        </p>
                        <p class="font-semibold text-gray-900">
                            {{ formatCurrency(price) }}
                        </p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">
                            Phí ship
                        </p>
                        <p class="font-semibold text-gray-900">30.000đ</p>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Thành tiền</p>
                    <p class="text-2xl font-semibold text-gray-900">
                        {{ formatCurrency(price + 30000) }}
                    </p>
                </div>
            </div>
            <div class="m-t-15"></div>
            <base-button :config="buttonConfig" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    BaseBreadcrumbs,
    BaseTextBox,
    BaseNumberBox,
    BaseSelectBox,
    BaseButton,
} from '@/components/base';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '@/utils';
import { DxButton, DxNumberBox, DxSelectBox, DxTextBox } from 'devextreme-vue';
import CartApi from '@/apis/cart/cart-api';
import { DeliveryModel } from '@/models';
import {
    addressCheckoutConfig,
    breadcrumbCheckoutConfig,
    buttonCheckoutConfig,
    cityCheckoutConfig,
    districtCheckoutConfig,
    emailCheckoutConfig,
    phoneNumberConfig,
    userNameConfig,
    wardCheckoutConfig,
} from '@/constants/views';
import { ref } from 'vue';

// #region comon
const cart = useCartStore();
const cartApi = new CartApi();
const delivery = new DeliveryModel();
const districtRef = ref<InstanceType<typeof DxSelectBox>>();
const wardRef = ref<InstanceType<typeof DxSelectBox>>();
const { cartList, totalPrice } = storeToRefs(cart);
// #endregion

// #region config
const buttonConfig: DxButton = {
    ...buttonCheckoutConfig,
};

const fullNameConfig = ref<DxTextBox>({
    ...userNameConfig,
});

const emailConfig = ref<DxTextBox>({
    ...emailCheckoutConfig,
});

const mobileConfig = ref<DxNumberBox>({
    ...phoneNumberConfig,
});

const addressConfig = ref<DxTextBox>({
    ...addressCheckoutConfig,
});

const cityConfig = ref<DxSelectBox>({
    ...cityCheckoutConfig,
    dataSource: [],
    onSelectionChanged(e) {
        delivery.CityName = e.selectedItem.Name;
        getDistrictCityData(e.selectedItem);
    },
});

const districtConfig = ref<DxSelectBox>({
    ...districtCheckoutConfig,
    dataSource: [],
    onSelectionChanged(e) {
        delivery.DistrictName = e.selectedItem.Name;
        getWardData(e.selectedItem);
    },
});

const wardConfig = ref<DxSelectBox>({
    ...wardCheckoutConfig,
    dataSource: [],
    onSelectionChanged(e) {
        delivery.WardName = e.selectedItem.Name;
    },
});
// #endregion

// #region handle events
const price = computed(() => {
    totalPrice.value = cartList.value.reduce((total, product) => {
        return total + product.Price * product.QuantityBuy;
    }, 0);

    return totalPrice.value;
});

async function renderCity() {
    const res = await cartApi.getEarthRealmVietNam();
    if (res?.data) {
        cityConfig.value.dataSource = res.data;
    }
}

renderCity();

function getDistrictCityData(selectedCity: any) {
    if (selectedCity?.Districts) {
        districtRef.value
            ?.getInstance()
            ?.option('dataSource', selectedCity.Districts);
    }
}

function getWardData(selectedDistrict: any) {
    if (selectedDistrict?.Wards) {
        wardRef.value
            ?.getInstance()
            ?.option('dataSource', selectedDistrict.Wards);
    }
}
// #endregion
</script>

<style lang="scss" scoped>
.option {
    label {
        border-width: 2px;
    }
    &:hover {
        label,
        .peer-checked\:border-gray-700 {
            border-color: var(--app-color-black);
        }
    }
}
</style>
