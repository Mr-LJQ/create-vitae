<template>
  <div class="h-[21rem] overflow-y-auto px-5">
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
  </div>
</template>
<script lang="ts" setup>
import { useCertificateStore } from "@/stores/certificate";
import TagModule from "@/components/share-modules/tag-module/index.vue";
import ShowCheckedTags from "@/components/show-checked-tags/index.vue";
import { placeholder, propsType, presetTags } from ".";
defineProps(propsType);
defineOptions({
  name: "certificate",
});
const store = useCertificateStore();
const { hasTag, deleteTag, addTag } = store;
</script>
