<template>
  <div :class="RICH_TEXT_EDITOR">
    <QuillEditor
      theme="snow"
      :toolbar="toolbar"
      :placeholder="placeholder"
      v-model:content="content"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { RICH_TEXT_EDITOR } from "@/styles";
import { propsType, emitsType, UPDATE_MODEL_VALUE } from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "RichTextEditor",
});
const toolbar = [
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, "bold", "italic", "underline", "link"],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ["image"],
  ["clean"],
];

const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(UPDATE_MODEL_VALUE, value);
  },
});
</script>
