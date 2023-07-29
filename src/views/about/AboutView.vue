<template>
    <div id="about">
        <base-breadcrumbs :config="breadcrumbAboutConfig" />
        <div class="about-title">
            Furns is a global furniture destination for somethings. We sell
            cutting-edge furniture and offer a wide variety of fashion-related
            content.
        </div>
        <div class="about-images">
            <img src="../../assets/images/demo/luffy.jpg" alt="" />
            <img src="../../assets/images/demo/sabo.jpg" alt="" />
        </div>
        <div class="about-content">
            <div class="content-left">
                <div class="title">OUR STORES</div>
                <div class="content">
                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse. Lorem ipsum dolor sit amet conse ctetur adipisicing
                    elit, sed do eiusmod tempor.
                </div>
            </div>
            <div class="content-right">
                <div class="title">OUR MISSION</div>
                <div class="content">
                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse. Lorem ipsum dolor sit amet conse ctetur adipisicing
                    elit, sed do eiusmod tempor.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BaseBreadcrumbs } from '@/components/base';
import { breadcrumbAboutConfig } from '@/constants/views';
import { translateScreen } from '@/utils';
import { onMounted } from 'vue';

// #region effects
onMounted(() => {
    translateScreen(180);
});
// #endregion
</script>

<style lang="scss" scoped>
#about {
    .about-title {
        max-width: 1200px;
        padding: 0 15px;
        margin: 0 auto;
        font-size: 32px;
        font-weight: 700;
    }
    .about-images {
        margin-top: 48px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            width: 646px;
            height: 400px;
            object-fit: cover;
        }
    }
    .about-content {
        max-width: 1200px;
        margin: 48px auto 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content-left,
        .content-right {
            padding: 0 16px;
            text-align: justify;
        }
        .title {
            font-size: 20px;
            margin-bottom: 15px;
            font-weight: 600;
        }
    }
}
</style>
