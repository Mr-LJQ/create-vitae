<template>
  <TagModule
    v-model:content="store.content"
    :placeholder="placeholder"
    :module-name="moduleName"
    :presetTags="presetTags"
    :has-tag="hasTag"
    :add-tag="addTag"
    :delete-tag="deleteTag"
  >
    <ShowCheckedTags :tags="store.tags" :delete-tag="deleteTag" />
  </TagModule>
</template>
<script lang="ts" setup>
import TagModule from "@/components/share-modules/tag-module/index.vue";
import ShowCheckedTags from "@/components/show-checked-tags/index.vue";
import { useInterestsStore } from "@/stores/interests";
import { propsType, presetTags, placeholder } from ".";
defineProps(propsType);
defineOptions({
  name: "HobbyInterests",
});

const store = useInterestsStore();
const { deleteTag, addTag, hasTag } = store;
</script>
