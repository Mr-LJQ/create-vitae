<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
            >
              <DialogTitle as="h3" class="text-lg leading-6 text-gray-900">
                相关说明
              </DialogTitle>
              <div
                class="mt-2 text-sm leading-normal text-gray-500 indent-[2em]"
              >
                <p>
                  该功能依赖于浏览器的打印能力，而该能力无法通过脚本进行处理，因此需要用户进行一些手动操作。
                </p>
                <p>
                  为使得其所生成的PDF，与在页面预览中的一致，需要进行如下配置：
                </p>
                <ul class="list-disc list-inside">
                  <li>目标打印机项选择为：另存为PDF</li>
                  <li>边距设置为：无</li>
                  <li>勾选背景图像</li>
                </ul>
                <p>
                  如果相关配置正确，打印预览中的画面应该与网页预览中所展示的一致
                </p>
              </div>

              <div class="flex justify-between items-center mt-4">
                <ElCheckbox v-model="alreadyUnderstood" label="不再提示" />
                <button
                  type="button"
                  class="rounded-md px-4 py-2 text-sm text-white bg-[#409eff] hover:bg-[#79bbff] outline-none focus-visible:outline-[#409eff]"
                  @click="openPrinter"
                >
                  唤出打印页面
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { ElCheckbox } from "element-plus";
import { propsType, emitsType, UPDATE_MODEL_VALUE } from ".";
const props = defineProps(propsType);
const emits = defineEmits(emitsType);
defineOptions({
  name: "ExplainPDF",
});

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(isOpen: boolean) {
    return emits(UPDATE_MODEL_VALUE, isOpen);
  },
});
function closeModal() {
  isOpen.value = false;
}

function openPrinter() {
  return window.print();
}

const alreadyUnderstood = ref(false);
</script>
