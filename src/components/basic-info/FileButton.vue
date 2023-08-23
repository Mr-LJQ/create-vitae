<template>
  <span class="upload_photo" @Click="handleUploadFileClick">
    上传照片
    <input type="file" ref="{fileInput}" />
  </span>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const fileInput = ref<HTMLInputElement>();
function handleUploadFileClick() {
  fileInput.value?.click();
}
</script>
<style scoped lang="scss">
@use "sass:math";
$item_height: 32px;
.upload_photo {
  box-sizing: border-box;
  display: inline-block;
  width: 100px;
  line-height: $item_height;
  font-size: 12px;
  text-align: center;
  border-radius: math.div($item_height, 2);
  vertical-align: top;
  cursor: pointer;
  background-color: #13d8a7;
  color: #fff;
  input {
    width: 0;
    height: 0;
    opacity: 0;
    border: none;
  }
}
</style>
