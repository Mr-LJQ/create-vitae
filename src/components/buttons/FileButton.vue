<template>
  <span :class="BUTTON_FILE_CLASS" @click="handleUploadFileClick">
    上传照片
    <input
      type="file"
      ref="fileInput"
      @change="handleChange"
      accept="image/*"
    />
  </span>
  <PictureCropper
    v-model="isOpen"
    :imageData="imageData"
    @imageChange="handleImageChange"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { PictureCropper } from "@/components";
import { BUTTON_FILE_CLASS } from "@/styles";
defineOptions({
  name: "FileButton",
  inheritAttrs: false,
});
const emit = defineEmits({
  change: (data: Blob) => data instanceof Blob,
});
const fileInput = ref<HTMLInputElement>();
function handleUploadFileClick() {
  fileInput.value?.click();
}

const isOpen = ref(false);
const imageData = ref<File>();
function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file == null) return;
  imageData.value = file;
  isOpen.value = true;
  //该行的作用是：允许重复上传同一张图片
  input.value = "";
}

function handleImageChange(data: Blob) {
  emit("change", data);
}
</script>
