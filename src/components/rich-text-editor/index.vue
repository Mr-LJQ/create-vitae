<template>
  <div :class="RICH_TEXT_EDITOR">
    <QuillEditor theme="snow" :toolbar="toolbar" :placeholder="placeholder" />
  </div>
</template>
<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { RICH_TEXT_EDITOR } from "@/styles";
import { props } from ".";
defineProps(props);
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
</script>
