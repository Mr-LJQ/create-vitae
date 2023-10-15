<template>
  <div ref="quillEditorContainerRef" :class="OVERRIDE_QUILL_READ_ONLY">
    <QuillEditor
      :content="content"
      :read-only="true"
      :options="{
        modules: {
          toolbar: false,
        },
      }"
      :style="quillContainerStyle"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watchEffect } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { dom } from "@/utils";
import { useConfigurationStore } from "@/stores";
import { OVERRIDE_QUILL_READ_ONLY } from "@/styles";
import { propsType } from ".";
defineOptions({
  name: "ReadOnlyRichText",
});
defineProps(propsType);

const store = useConfigurationStore();
const quillContainerStyle = computed(() => {
  return {
    "font-family": store.fontFamily,
    "font-size": store.fontSize + "px",
  };
});

/**
 *
 */
const quillEditorContainerRef = ref<HTMLElement | null>(null);
onMounted(() => {
  const divElement = dom(quillEditorContainerRef);
  if (!divElement) return;
  const qlEditorElement = divElement.querySelector(
    ".ql-editor",
  ) as HTMLElement | null;
  if (!qlEditorElement) return;
  watchEffect(() => {
    qlEditorElement.style.lineHeight = String(store.lineGap + 1);
  });
});
</script>
