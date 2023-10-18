<template>
  <ElDialog
    width="26rem"
    v-model="isOpen"
    destroy-on-close
    :lock-scroll="false"
    data-focus-visible-none
  >
    <template #header>
      <h3>相关说明</h3>
    </template>
    <template #default>
      <div class="mt-2 text-sm leading-normal text-gray-500 indent-[2em]">
        <p>
          该功能依赖于浏览器的打印能力，而该能力无法通过脚本进行处理，因此需要用户进行一些手动操作。
        </p>
        <p>
          为使得其所生成的PDF，与在页面预览中的一致，需要在打印页面进行如下配置：
        </p>
        <ul class="list-disc list-inside">
          <li>另存为PDF</li>
          <li>勾选背景图像</li>
          <li>边距设置为：无</li>
          <li>不打印页眉页脚</li>
        </ul>
        <p>如果相关配置正确，打印预览中的画面应该与网页预览中所展示的一致</p>
      </div>

      <div class="flex justify-between items-center mt-4">
        <ElCheckbox v-model="notShowPDFExplain" label="不再提示" />
        <PrimaryButton type="button" @click="openPrintPage">
          唤出打印页面
        </PrimaryButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElCheckbox, ElDialog } from "element-plus";
import { PrimaryButton } from "@/components";
import { propsType, emitsType, UPDATE_MODEL_VALUE } from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "ExplainPDF",
});

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(isOpen: boolean) {
    return emit(UPDATE_MODEL_VALUE, isOpen);
  },
});

const notShowPDFExplain = ref(false);

function openPrintPage() {
  isOpen.value = false;
  props.openPrintPage();
  emit("whetherShowPDFExplain", !notShowPDFExplain.value);
}
</script>
