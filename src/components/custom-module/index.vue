<template>
  <RichTextEditor v-model="store.editorContent" :placeholder="placeholder" />
</template>
<script lang="ts" setup>
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import { useCustomModuleStore } from "@/stores/custom-module";
import { placeholder } from ".";
defineOptions({
  name: "CustomModule",
});
const store = useCustomModuleStore();
</script>
<style></style>
