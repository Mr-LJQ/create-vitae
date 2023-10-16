<template>
  <div
    data-focus-visible-none
    :id="id"
    :class="OVERRIDE_QUILL_SNOW"
    ref="editorRef"
  >
    <QuillEditor
      theme="snow"
      :toolbar="toolbar"
      :placeholder="placeholder"
      v-model:content="content"
      @ready="(quill) => $emit(READY, quill)"
      :options="{
        bounds: '#' + id,
      }"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, unref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { OVERRIDE_QUILL_SNOW } from "@/styles";
import { useId } from "@/hooks";
import {
  toolbar,
  propsType,
  emitsType,
  titleConfig,
  READY,
  UPDATE_MODEL_VALUE,
} from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "RichTextEditor",
});

/*
 * 提供对 v-model 语法的支持
 */

const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(UPDATE_MODEL_VALUE, value);
  },
});

/*
 * 因为quill 不支持原生的 title 设置，因此需要命令式的添加title
 */
const editorRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
  const editor = editorRef.value!;
  Object.entries(titleConfig).forEach(([key, val]) => {
    const element = editor.querySelector(".ql-toolbar ." + key);
    if (element instanceof HTMLButtonElement) {
      element.title = val;
    }
    if (element instanceof HTMLSpanElement) {
      const child = element.querySelector(".ql-picker-label");
      child && ((child as HTMLElement).title = val);
    }
  });
});

/*
 * 问题：quill 的 tooltip 没有在点击 link 按钮后出现在恰当的位置，而是出现了巨大的偏移
    该问题通过设置 options 的 bounds 选项得到解决，需要注意的是，options 选项是命令式的，
    只有第一次设置的值才会生效。这意味着向 bounds 属性传递一个 模版引用（ref）是没用的，
    因为ref一开始是null。这里的解决方法是向 bounds 传递一个css ID选择器字符串，
    因为 useId 的返回值是响应式的，而 options 只采用第一次定义时的值，因此需要用 unref对Id进行处理，
    避免意外的BUG产生。  
 */
const id = unref(useId());
</script>
