<template>
  <TagModule
    v-model:content="store.content"
    :placeholder="placeholder"
    :module-name="moduleName"
    :presetTags="presetTags"
    :add-tag="addTag"
    :has-tag="hasTag"
    :delete-tag="deleteTag"
  >
    <ShowCheckedTags :tags="store.tags" :delete-tag="deleteTag" />
  </TagModule>
</template>
<script lang="ts" setup>
import { useCertificateStore } from "@/stores";
import { TagModule, ShowCheckedTags } from "@/components";
import { placeholder, propsType, presetTags } from ".";
defineProps(propsType);
defineOptions({
  name: "HonorCertificate",
});
const store = useCertificateStore();
const { hasTag, deleteTag, addTag } = store;
</script>
