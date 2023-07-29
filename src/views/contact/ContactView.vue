<template>
    <base-breadcrumbs :config="breadcrumbContactConfig" />
    <div id="contact">
        <base-map :config="mapConfig" />
        <div class="contact-content">
            <div class="contact-info">
                <div class="title">{{ t('page.contact.info') }}</div>
                <div class="item-wrapper">
                    <div class="left">
                        <div class="item-name">
                            {{ t('page.contact.phone') }}{{ t('sign.colon') }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="item-details">+012 345 678 102</div>
                        <div class="item-details">+012 345 678 203</div>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="left">
                        <div class="item-name">
                            {{ t('page.contact.email') }}{{ t('sign.colon') }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="item-details">email@here.com</div>
                        <div class="item-details">your@email.here</div>
                    </div>
                </div>
                <div class="item-wrapper">
                    <div class="left">
                        <div class="item-name">
                            {{ t('page.contact.address') }}{{ t('sign.colon') }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="item-details">Address goes here,</div>
                        <div class="item-details">street, Crossroad 123.</div>
                    </div>
                </div>
            </div>
            <div class="get-in-touch">
                <div class="title">{{ t('page.contact.getInTouch') }}</div>
                <div class="row space-between">
                    <div class="col-2-48">
                        <base-text-box
                            ref="firstNameRef"
                            :config="firstNameConfig"
                        />
                    </div>
                    <div class="col-2-48">
                        <base-text-box
                            ref="lastNameRef"
                            :config="lastNameConfig"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <base-text-box
                            ref="subjectRef"
                            :config="subjectConfig"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <base-text-area
                            ref="baseTextAreaRef"
                            v-model="theResult.Message"
                            :config="messageConfig"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <base-button ref="btnConfirmRef" :config="confirmBtn" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BaseMap,
    BaseButton,
    BaseTextBox,
    BaseTextArea,
    BaseBreadcrumbs,
} from '@/components/base';
import type { DxButton, DxMap, DxTextArea, DxTextBox } from 'devextreme-vue';
import { breadcrumbContactConfig } from '@/constants/views';
import { defaultMapConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import { ButtonStylingMode, ButtonType } from '@/enums';
import { useI18n } from 'vue3-i18n';

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    config: DxMap;
}>();
// #endregion

// #region config
const mapConfig = mergeObjects(defaultMapConfig, props.config);

const confirmBtn = ref<DxButton>({
    width: '100%',
    height: 48,
    stylingMode: ButtonStylingMode.contained,
    type: ButtonType.normal,
    text: t('base.button.sendMessage').toUpperCase(),
    onClick: () => {
        handleClickConfirm();
    },
});

const messageConfig = ref<DxTextArea>({
    height: 45,
    label: 'Message',
    labelMode: 'floating',
});

const firstNameConfig = ref<DxTextBox>({
    height: 45,
    label: 'First Name',
    labelMode: 'floating',
});

const lastNameConfig = ref<DxTextBox>({
    height: 45,
    label: 'Last Name',
    labelMode: 'floating',
});

const subjectConfig = ref<DxTextBox>({
    height: 45,
    label: 'Subject',
    labelMode: 'floating',
});

const theResult = ref<any>({
    FirstName: '',
    LastName: '',
    Subject: '',
    Message: '',
});

const baseTextAreaRef = ref();
const firstNameRef = ref();
const lastNameRef = ref();
const subjectRef = ref();
const btnConfirmRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseTextAreaRef.value?.getInstance().option('label', 'Tin nhắn');
            firstNameRef.value?.getInstance().option('label', 'Tên');
            lastNameRef.value?.getInstance().option('label', 'Họ');
            subjectRef.value?.getInstance().option('label', 'Chủ đề');
            btnConfirmRef.value
                ?.getInstance()
                .option('text', t('base.button.sendMessage').toUpperCase());
        }
    }
);
// #endregion

// #region handle events
const handleClickConfirm = () => {};
// #endregion
</script>

<style lang="scss" scoped>
#contact {
    padding: 0 80px 80px;
    .contact-content {
        width: 100%;
        margin-top: 60px;
        display: flex;
        height: 500px;
        align-items: center;
        justify-content: space-between;
        .contact-info {
            width: 370px;
            height: 100%;
            margin-right: 30px;
            padding: 50px 30px;
            background-color: var(--app-color-bg-contact);
            .title {
                font-weight: 600;
                font-size: 24px;
                margin-bottom: 30px;
            }
            .item-wrapper {
                display: flex;
                & + .item-wrapper {
                    margin-top: 20px;
                }
                .left {
                    width: 36%;
                    .item-name {
                        font-weight: 600;
                        font-size: 16px;
                    }
                }
                .right {
                    width: 64%;
                    display: flex;
                    flex-direction: column;
                    .item-details {
                        font-size: 16px;
                    }
                }
            }
        }
        .get-in-touch {
            flex: 1;
            height: 100%;
            padding: 50px 30px;
            background-color: var(--app-color-bg-contact);
            .title {
                font-weight: 600;
                font-size: 24px;
                margin-bottom: 30px;
            }
            .row {
                margin-bottom: 25px;
            }
        }
    }
}
</style>
