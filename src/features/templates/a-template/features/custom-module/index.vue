<template>
  <div class="mt-3">
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      :content="store.editorContent"
      class="mt-3"
      v-if="!isEmptyDelta(store.editorContent)"
    />
  </div>
</template>
<script lang="ts" setup>
import Separation from "../../components/separation/index.vue";
import { isEmptyDelta } from "@/utils";
import ReadOnlyRichText from "@/components/read-only-rich-text/index.vue";
import { useCustomModuleStore } from "@/stores/custom-module";
import { propsType } from ".";
defineOptions({
  name: "CustomModule",
});
defineProps(propsType);
const store = useCustomModuleStore();
</script>
