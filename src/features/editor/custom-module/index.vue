<template>
  <RichTextEditor
    class="h-80 max-w-[75rem] mx-auto"
    :placeholder="placeholder"
    v-model="store.editorContent"
  />
</template>
<script lang="ts" setup>
import { RichTextEditor } from "@/components";
import { useCustomModuleStore } from "@/stores";
import { placeholder } from ".";
defineOptions({
  name: "CustomModule",
});
const store = useCustomModuleStore();
</script>
