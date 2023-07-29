import { defineStore } from 'pinia';
import { readonly } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const isShowToast = ref<boolean>(false);

    const toggleToast = (type: boolean) => {
        isShowToast.value = type;
    };

    return {
        isShowToast: readonly(isShowToast),
        toggleToast,
    };
});
