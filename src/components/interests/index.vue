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
    <ul class="flex flex-wrap mt-3">
      <li class="mr-3 mb-2" :key="tag" v-for="tag of store.tags">
        <el-tag
          hit
          round
          closable
          size="large"
          effect="plain"
          @close="deleteTag(tag)"
          >{{ tag }}</el-tag
        >
      </li>
    </ul>
  </TagModule>
</template>
<script lang="ts" setup>
import { ElTag } from "element-plus";
import TagModule from "@/components/share-modules/tag-module/index.vue";
import { useInterestsStore } from "@/stores/interests";
import { propsType, presetTags, placeholder } from ".";
defineProps(propsType);
defineOptions({
  name: "interests",
});

const store = useInterestsStore();
const { deleteTag, addTag, hasTag } = store;
</script>
