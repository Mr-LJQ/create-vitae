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
    v-if="openPictureCropper"
    @imageChange="handleImageChange"
  />
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, watch } from "vue";
import { ElNotification } from "element-plus";
import { BUTTON_FILE_CLASS } from "@/styles";
defineOptions({
  name: "FileButton",
  inheritAttrs: false,
});
const emit = defineEmits({
  change: (data: Blob) => data instanceof Blob,
});

const affirmError = ref(false);
const PictureCropper = defineAsyncComponent({
  loader: () => import("@/components/picture-cropper/index.vue"),
  onError(error) {
    ElNotification.error({
      title: "图片裁切相关功能加载失败",
      message: `错误信息：${error}`,
      duration: 0,
    });
    //处理回退相关逻辑
    affirmError.value = true;
  },
});

const openPictureCropper = ref(false);
const fileInput = ref<HTMLInputElement>();
function handleUploadFileClick() {
  fileInput.value?.click();
  //当用户点击按钮上传图片时，才异步加载图片裁切相关代码
  openPictureCropper.value = true;
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
  /**
   * 图片裁切功能加载失败，如果想要回退，则需要考虑时序问题
   *  因为加载失败可能发生在用户上传图片后，也可能发生在用户上传图片前
   *  也即代码运行到这里，需要考虑多种情况：
   *    1.失败是已知的（已经发生），此时可以在此运行回退相关代码
   *    2.失败是未知的：
   *        - 之后会成功，什么都不用做，现有代码会解决
   *        - 之后会失败，需要额外的代码处理回退问题（通过下面的 watch 处理该问题）
   */
  if (affirmError.value) {
    handleImageChange(file);
  }
}

/**
 * 此处有两种情况，
 *  - 文件上传前失败，则因为 mageData.value 的值还为 null，而不执行回退相关逻辑
 *      而在文件上传后，handleChange 会执行回退相关逻辑
 *  - 文件上传后失败，则 handleChange 没有执行回退相关逻辑，此时因为 mageData.value 有值，
 *      所以此处会指向回退相关逻辑
 * 因为 affirmError 只会发生一次改变，因此此 watch 只会执行一次
 *
 */
const clear = watch(affirmError, () => {
  if (imageData.value) {
    handleImageChange(imageData.value);
  }
  clear();
});

function handleImageChange(data: Blob) {
  emit("change", data);
}
</script>
