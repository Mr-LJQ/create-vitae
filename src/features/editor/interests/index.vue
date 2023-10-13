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
import { useInterestsStore } from "@/stores";
import { TagModule, ShowCheckedTags } from "@/components";
import { propsType, presetTags, placeholder } from ".";
defineProps(propsType);
defineOptions({
  name: "HobbyInterests",
});

const store = useInterestsStore();
const { deleteTag, addTag, hasTag } = store;
</script>
