<template>
  <section>
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      :content="store.editorContent"
      class="mt-3"
      v-if="!isEmptyDelta(store.editorContent)"
    />
  </section>
</template>
<script lang="ts" setup>
import Separation from "../../components/separation/index.vue";
import { isEmptyDelta } from "@/utils";
import ReadOnlyRichText from "@/components/read-only-rich-text/index.vue";
import { useSelfEvaluationStore } from "@/stores/self-evaluation";
import { propsType } from ".";
defineOptions({
  name: "SelfEvaluation",
});
defineProps(propsType);
const store = useSelfEvaluationStore();
</script>
