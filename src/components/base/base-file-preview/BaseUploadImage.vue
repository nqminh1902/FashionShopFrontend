<template>
    <div id="app">
        <file-pond
            name="test"
            ref="pond"
            label-idle="Drop files here..."
            v-bind:allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            :server="null"
            v-bind="myFiles"
            @addfile="handleUploadFile"
            @removefile="handleRemoveFile"
        />
        <button @click="upload">Upload</button>
    </div>
</template>
<script setup lang="ts">
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { ref } from "vue";
import axios from "axios";
// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);
const pondRef = ref<HTMLElement | null>(null);
const myFiles = ref([]);

function handleFilePondInit() {
    console.log("FilePond has initialized");
}

function handleUploadFile(error: any, file: any) {
    const formData = new FormData();
    formData.append("files", file.file);
    axios
        .post("https://localhost:7236/api/Upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            console.log(response.data); // Handle the response from the backend
        })
        .catch((error) => {
            console.error(error);
        });
}

function handleRemoveFile(error: any, file: any) {
    const formData = new FormData();
    formData.append("files", file.file);
    // axios
    //     .post(`https://localhost:7236/api/Upload/${}`)
    //     .then((response) => {
    //         console.log(response.data); // Handle the response from the backend
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
}

function upload() {
    console.log(myFiles.value);
}
</script>
<style lang="scss"></style>
