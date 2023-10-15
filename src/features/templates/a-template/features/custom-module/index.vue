<template>
  <section>
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      :content="store.editorContent"
      v-if="!isEmptyDelta(store.editorContent)"
    />
  </section>
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
