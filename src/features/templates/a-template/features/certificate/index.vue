<template>
  <div class="mt-3">
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      class="mt-3"
      :content="store.content"
      v-if="!isEmptyDelta(store.content)"
    />
    <div class="flex flex-wrap mt-2">
      <Tag :key="tag" v-for="tag of store.tags">{{ tag }}</Tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Tag from "../../components/tag/index.vue";
import Separation from "../../components/separation/index.vue";
import { isEmptyDelta } from "@/utils";
import ReadOnlyRichText from "@/components/read-only-rich-text/index.vue";
import { useCertificateStore } from "@/stores/certificate";
import { propsType } from ".";
defineOptions({
  name: "HonorCertificate",
});
defineProps(propsType);
const store = useCertificateStore();
</script>
