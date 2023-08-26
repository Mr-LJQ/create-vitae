<template>
  <RichTextEditor class="h-280" :placeholder="placeholder" v-model="store.selfEvaluation" />
</template>
<script lang="ts" setup>
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import { placeholder } from ".";
import { useSelfEvaluationStore } from "@/stores/self-evaluation";
defineOptions({
  name: "SelfEvaluation",
});
const store = useSelfEvaluationStore();
</script>
<style></style>
