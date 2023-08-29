<template>
  <TagModule
    v-model:custom="custom"
    v-model:content="store.content"
    :placeholder="placeholder"
    :module-name="moduleName"
    :presetTags="presetTags"
    @handle_add_custom="handleAddCustom"
    @handle_toggle_tag="handleToggleTag"
  />
  <ul>
    <li :key="tag" v-for="tag of store.tags">
      <span>{{ tag }}</span>
      <el-icon @click="deleteTag(tag)"><Minus /></el-icon>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElIcon } from "element-plus";
import { Minus } from "@element-plus/icons-vue";
import TagModule from "@/components/share-modules/tag-module/index.vue";
import { useInterestsStore } from "@/stores/interests";
import {
  useHandleAddCustom,
  useHandleToggleTag,
} from "@/hooks/use-tag-handler";
import { propsType, presetTags, placeholder } from ".";
defineProps(propsType);
defineOptions({
  name: "interests",
});

const store = useInterestsStore();
const { addNewTag, deleteTag, hasTag } = store;
const custom = ref("");
const handleAddCustom = useHandleAddCustom(custom, {
  hasTag,
  addNewTag,
});
const handleToggleTag = useHandleToggleTag({ addNewTag, deleteTag, hasTag });
</script>
