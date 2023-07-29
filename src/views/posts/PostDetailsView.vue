<template>
    <div id="post-details">
        <base-breadcrumbs :config="breadcrumbPostConfig" />
        <div class="post-content-wrapper">
            <div class="post-image">
                <img :src="thePost.PostImage" :alt="thePost.ImageAlt" />
            </div>
            <div class="post-info d-flex-center">
                <div class="post-author">
                    {{ t('base.post.by') }}
                    <span
                        class="post-author-name cpointer"
                        @click="moveToListOfAuthor"
                        >{{ thePost.Author }}</span
                    >
                </div>
                <div class="post-date cpointer" @click="moveToListByDate">
                    {{ thePost.Date }}
                </div>
            </div>
            <div class="post-title">{{ thePost.PostName }}</div>
            <div class="post-content">
                <div v-html="thePost.PostContent"></div>
            </div>
            <div class="post-interact d-flex-center">
                <div class="left">
                    {{ t('page.post.tags') }}{{ t('sign.colon') }}
                    <span
                        class="tag"
                        v-for="(item, index) of thePost.TagName"
                        :key="index"
                        @click="handleClickTag(item)"
                        >{{ item }}
                        <span v-if="index + 1 < thePost.TagName.length"
                            >,
                        </span>
                    </span>
                </div>
                <div class="right d-flex-center">
                    {{ t('page.post.shared') }}{{ t('sign.colon') }}
                    <Icon icon="ic:baseline-facebook" :width="20" />
                    <Icon icon="mdi:twitter" :width="20" />
                    <Icon icon="mdi:instagram" :width="20" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PostApi from '@/apis/post/post-api';
import { BaseBreadcrumbs } from '@/components/base';
import { breadcrumbPostConfig } from '@/constants/views';
import { useI18n } from 'vue3-i18n';
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';
import { translateScreen } from '@/utils';

// #region effects
onMounted(() => {
    translateScreen(180);
});
// #endregion

// #region common
const { t } = useI18n();
const postApi = new PostApi();
const route = useRoute();

const thePost = postApi.getByPostID(route.params.id[0]);
// #endregion

// #region handle events
/**
 * TODO: lọc theo tác giả
 */
const moveToListOfAuthor = () => {
    console.log('List post of author');
};

/**
 * TODO: lọc theo ngày đăng
 */
const moveToListByDate = () => {
    console.log('List post by date');
};

const handleClickTag = (item: string) => {
    console.log(`Clicked ${item}`);
};
// #endregion
</script>

<style lang="scss" scoped>
#post-details {
    .post-content-wrapper {
        padding: 0 160px;
    }
    .post-image {
        width: 860px;
        height: 480px;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 20px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .post-content {
        font-size: 16px;
        text-align: justify;
    }
    .post-info {
        margin-bottom: 16px;
        font-weight: 600;
        .post-date {
            margin-left: 20px;
            &:hover {
                color: var(--app-color-primary);
            }
        }
        .post-author {
            .post-author-name {
                &:hover {
                    color: var(--app-color-primary);
                }
            }
        }
    }
    .post-title {
        font-size: 30px;
        margin-bottom: 20px;
        letter-spacing: -0.6px;
    }
    .post-interact {
        margin-top: 30px;
        padding-top: 35px;
        justify-content: space-between;
        margin-bottom: 80px;
        font-size: 16px;
        border-top: 1px solid var(--app-color-border-lighter);
        .tag {
            &:hover {
                cursor: pointer;
                color: var(--app-color-primary);
            }
        }
        svg {
            margin-left: 6px;
            &:hover {
                cursor: pointer;
                color: var(--app-color-primary);
            }
        }
    }
}
</style>
