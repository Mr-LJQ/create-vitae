<template>
  <div :class="OVERRIDE_QUILL_SNOW" ref="editorRef">
    <QuillEditor
      theme="snow"
      :toolbar="toolbar"
      :placeholder="placeholder"
      v-model:content="content"
      @ready="(quill) => $emit(READY, quill)"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { OVERRIDE_QUILL_SNOW } from "@/styles";
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
</script>
