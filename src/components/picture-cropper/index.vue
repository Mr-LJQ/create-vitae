<template>
  <ElDialog
    v-model="isOpen"
    width="29rem"
    destroy-on-close
    :lock-scroll="false"
    :append-to-body="true"
  >
    <template #header>
      <h3>修剪图片</h3>
    </template>
    <div class="flex">
      <div class="mr-3">
        <div class="h-[14rem] w-[14rem]">
          <VueCropper
            autoCrop
            ref="cropperRef"
            :img="imgUrl"
            centerBox
          ></VueCropper>
        </div>
        <div class="mt-2 flex justify-between">
          <PrimaryButton @click="dextrorotation">
            <span
              :class="`icon_font_common icon-common-dextrorotation`"
              class="block"
            ></span>
          </PrimaryButton>
          <PrimaryButton @click="levorotation">
            <span
              :class="`icon_font_common icon-common-levorotation`"
              class="block"
            ></span>
          </PrimaryButton>
        </div>
      </div>

      <div class="flex flex-col">
        <h4>温馨提示：</h4>
        <p class="indent-[2em]">
          可通过鼠标滚轮缩放图片，截图框与其背景都可以移动
        </p>
        <PrimaryButton type="button" @click="updateImg"> 确认 </PrimaryButton>
      </div>
    </div>
  </ElDialog>
</template>
<script lang="ts" setup>
import {
  ref,
  computed,
  onUnmounted,
  type PropType,
  type ComponentPublicInstance,
} from "vue";
import { PrimaryButton } from "@/components";
import { ElDialog } from "element-plus";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
defineOptions({
  name: "DialogBox",
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  imageData: {
    type: Object as PropType<File>,
  },
} as const);
const emit = defineEmits({
  "update:modelValue": (payload: boolean) => typeof payload === "boolean",
  imageChange: (payload: Blob) => payload instanceof Blob,
});

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit("update:modelValue", value);
  },
});

/**
 * 将图片数据转换为URL
 */
let imgObjectURL: string | null = null;
const imgUrl = computed(() => {
  if (props.imageData) {
    imgObjectURL && URL.revokeObjectURL(imgObjectURL);
    imgObjectURL = URL.createObjectURL(props.imageData);
    return imgObjectURL;
  }
  return null;
});
onUnmounted(() => {
  imgObjectURL && URL.revokeObjectURL(imgObjectURL);
});
/**
 * 确认裁切，根据裁切范围生成新数据
 */
const cropperRef = ref<ComponentPublicInstance<{
  getCropBlob: (callback: (data: Blob) => void) => void;
  rotateRight: () => void;
  rotateLeft: () => void;
}> | null>(null);
function updateImg() {
  if (!cropperRef.value) return;
  cropperRef.value.getCropBlob((data) => {
    emit("imageChange", data);
    isOpen.value = false;
  });
}

/**
 * 左旋，右旋处理
 */
function dextrorotation() {
  if (!cropperRef.value) return;
  cropperRef.value.rotateRight();
}
function levorotation() {
  if (!cropperRef.value) return;
  cropperRef.value.rotateLeft();
}
</script>
