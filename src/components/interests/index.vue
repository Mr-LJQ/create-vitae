<template>
  <div class="h-[21rem] overflow-y-auto px-5">
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
  </div>
</template>
<script lang="ts" setup>
import TagModule from "@/components/share-modules/tag-module/index.vue";
import ShowCheckedTags from "@/components/show-checked-tags/index.vue";
import { useInterestsStore } from "@/stores/interests";
import { propsType, presetTags, placeholder } from ".";
defineProps(propsType);
defineOptions({
  name: "interests",
});

const store = useInterestsStore();
const { deleteTag, addTag, hasTag } = store;
</script>
