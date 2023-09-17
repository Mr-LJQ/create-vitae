<template>
  <span :class="BUTTON_FILE_CLASS" @click="handleUploadFileClick">
    上传照片
    <input v-bind="$attrs" type="file" ref="fileInput" />
  </span>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { BUTTON_FILE_CLASS } from "@/styles";
defineOptions({
  name: "FileButton",
  inheritAttrs: false,
});

const fileInput = ref<HTMLInputElement>();
function handleUploadFileClick() {
  fileInput.value?.click();
}
</script>
