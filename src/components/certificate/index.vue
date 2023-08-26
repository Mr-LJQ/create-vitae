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
import { Minus } from "@element-plus/icons-vue";
import TagModule from "@/components/share-modules/TagModule.vue";
import { useCertificateStore } from "@/stores/certificate";
import {
  useHandleAddCustom,
  useHandleToggleTag,
} from "@/hooks/use-tag-handler";
import { placeholder, propsType, presetTags } from ".";
defineProps(propsType);
defineOptions({
  name: "certificate",
});
const store = useCertificateStore();
const { hasTag, deleteTag, addNewTag } = store;
const custom = ref("");
const handleAddCustom = useHandleAddCustom(custom, {
  hasTag,
  addNewTag,
});
const handleToggleTag = useHandleToggleTag({
  hasTag,
  deleteTag,
  addNewTag,
});
</script>
