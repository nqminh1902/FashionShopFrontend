<template>
    <base-breadcrumbs :config="breadcrumbAccountConfig" />
    <div id="account" class="d-flex-center">
        <div class="left">
            <div class="info">
                <div class="avatar">
                    <img src="../../assets/images/demo/sabo.jpg" alt="" />
                </div>
                <div class="name">{{ data.userOptions.UserName }}</div>
            </div>
            <div class="tabs">
                <div
                    class="tab account d-flex-center"
                    :class="{ active: isTabActive(0) }"
                    @click="handleClickActive(0)"
                >
                    <Icon icon="material-symbols:account-circle" :width="26" />
                    <span>{{ t('page.account.account') }}</span>
                </div>
                <div
                    class="tab password d-flex-center"
                    :class="{ active: isTabActive(1) }"
                    @click="handleClickActive(1)"
                >
                    <Icon icon="mdi:password" :width="26" />
                    <span>{{ t('page.account.password') }}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div v-if="isTabActive(0)">
                <div class="title">{{ t('page.account.accountSettings') }}</div>
                <div class="form">
                    <div class="row">
                        <base-text-box :config="firstNameConfig" />
                        <div class="m-r-20"></div>
                        <base-text-box :config="lastNameConfig" />
                    </div>
                    <div class="row">
                        <base-text-box :config="emailConfig" />
                        <div class="m-r-20"></div>
                        <base-text-box :config="phoneNumberConfig" />
                    </div>
                    <div class="row">
                        <base-text-box :config="addressConfig" />
                        <div class="m-r-20"></div>
                        <base-date-box :config="dateOfBirthConfig" />
                    </div>
                    <div class="row m-t-4">
                        <base-radio-group :config="genderConfig" />
                    </div>
                    <div class="row">
                        <base-text-area :config="hobbyConfig" />
                    </div>
                    <div class="row m-t-15">
                        <base-button :config="positiveBtnConfig" />
                        <div class="m-r-10"></div>
                        <base-button :config="negativeBtnConfig" />
                    </div>
                </div>
            </div>
            <div v-if="isTabActive(1)">
                <div class="title">
                    {{ t('page.account.passwordSettings') }}
                </div>
                <div class="form">
                    <div class="row">
                        <base-text-box :config="lastPswConfig" />
                    </div>
                    <div class="row">
                        <base-text-box :config="newPswConfig" />
                    </div>
                    <div class="row">
                        <base-text-box :config="confirmPswConfig" />
                    </div>
                    <div class="row m-t-8">
                        <base-check-box :config="acceptConfig" />
                    </div>
                    <div class="row m-t-15">
                        <base-button :config="okeBtnConfig" />
                        <div class="m-r-10"></div>
                        <base-button :config="cancelBtnConfig" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BaseRadioGroup,
    BaseTextBox,
    BaseDateBox,
    BaseTextArea,
    BaseButton,
    BaseBreadcrumbs,
    BaseCheckBox,
} from '@/components/base';
import type {
    DxButton,
    DxCheckBox,
    DxDateBox,
    DxRadioGroup,
    DxTextArea,
    DxTextBox,
} from 'devextreme-vue';
import { Icon } from '@iconify/vue';
import { breadcrumbAccountConfig } from '@/constants/views';
import { useI18n } from 'vue3-i18n';
import { ButtonType } from '@/enums';
import { useUserOptionStore } from '@/stores';

// #region common
const data = useUserOptionStore();
const { t, getLocale } = useI18n();
let tabActive = ref<number>(0);

let isTabActive = (index: number) => tabActive.value === index;

const handleClickActive = (index: number) => {
    tabActive.value = index;
};

const firstNameConfig: DxTextBox = {
    width: 180,
    label: t('page.account.firstName'),
    labelMode: 'floating',
};
const lastNameConfig: DxTextBox = {
    width: 180,
    label: t('page.account.lastName'),
    labelMode: 'floating',
};
const emailConfig: DxTextBox = {
    width: 180,
    label: t('page.account.email'),
    labelMode: 'floating',
};
const phoneNumberConfig: DxTextBox = {
    width: 180,
    label: t('page.account.phoneNumber'),
    labelMode: 'floating',
};
const addressConfig: DxTextBox = {
    width: 180,
    label: t('page.account.address'),
    labelMode: 'floating',
};
const dateOfBirthConfig: DxDateBox = {
    width: 180,
    label: t('page.account.dateOfBirth'),
    labelMode: 'floating',
};
const genderConfig: DxRadioGroup = {
    dataSource: [t('gender.male'), t('gender.female'), t('gender.other')],
};
const hobbyConfig: DxTextArea = {
    width: 380,
    label: t('page.account.hobbies'),
    labelMode: 'floating',
};
const positiveBtnConfig: DxButton = {
    text: t('page.account.update'),
};
const negativeBtnConfig: DxButton = {
    text: t('page.account.cancel'),
    type: ButtonType.normal,
};
const lastPswConfig: DxTextBox = {
    width: 380,
    label: t('page.account.oldPsw'),
    labelMode: 'floating',
};
const newPswConfig: DxTextBox = {
    width: 380,
    label: t('page.account.newPsw'),
    labelMode: 'floating',
};
const confirmPswConfig: DxTextBox = {
    width: 380,
    label: t('page.account.confirmPsw'),
    labelMode: 'floating',
};
const acceptConfig: DxCheckBox = {
    text: t('page.account.remember'),
};
const okeBtnConfig: DxButton = {
    text: t('page.account.update'),
};
const cancelBtnConfig: DxButton = {
    text: t('page.account.cancel'),
    type: ButtonType.normal,
};
// #endregion
</script>

<style lang="scss" scoped>
#account {
    padding: 0 80px;
    margin-bottom: 80px;
    min-height: 400px;
    .left {
        min-width: 20%;
        margin-right: 100px;
        border-right: 1px solid var(--app-color-border-lighter);
        .info {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 20px;
            .avatar {
                width: 100px;
                height: 100px;
                overflow: hidden;
                border-radius: 50%;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
            .name {
                font-size: 17px;
                font-weight: 600;
            }
        }
        .tabs {
            .tab {
                width: 100%;
                height: 48px;
                padding: 0 16px;
                &.active {
                    color: var(--app-color-white);
                    background-color: var(--app-color-secondary);
                }
                span {
                    margin-left: 12px;
                }
                &:hover {
                    cursor: pointer;
                    color: var(--app-color-white);
                    background-color: var(--app-color-secondary);
                }
                & + .tab {
                    margin-top: 4px;
                }
            }
        }
    }
    .right {
        width: 65%;
        .title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
        }
    }
}
</style>
