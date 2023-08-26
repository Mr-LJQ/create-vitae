<template>
  <div :class="RICH_TEXT_EDITOR" ref="editorRef">
    <QuillEditor
      theme="snow"
      :toolbar="toolbar"
      :placeholder="placeholder"
      v-model:content="content"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { RICH_TEXT_EDITOR } from "@/styles";
import {
  propsType,
  emitsType,
  UPDATE_MODEL_VALUE,
  toolbar,
  titleConfig,
} from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "RichTextEditor",
});

const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(UPDATE_MODEL_VALUE, value);
  },
});

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
