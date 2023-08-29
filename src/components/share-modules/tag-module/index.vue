<template>
  <RichTextEditor class="h-130-188" :placeholder="placeholder" v-model="content" />
  <div>
    <span
      v-for="tag of presetTags"
      :key="tag"
      @click="$emit(HANDLE_TOGGLE_TAG, tag)"
      >{{ tag }}</span
    >
  </div>
  <div>
    <EditInput v-model="custom" />
    <el-button
      @click="$emit(HANDLE_ADD_CUSTOM)"
      type="primary"
      round
      :icon="Plus"
      >添加自定义{{ moduleName }}</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ElButton } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import EditInput from "@/components/edit-input/index.vue";
import {
  propsType,
  emitsType,
  UPDATE_CUSTOM,
  UPDATE_CONTENT,
  HANDLE_TOGGLE_TAG,
  HANDLE_ADD_CUSTOM,
} from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "TagModule",
});

/**
 * 适配 v-model
 */
const content = computed({
  get() {
    return props.content;
  },
  set(value) {
    emit(UPDATE_CONTENT, value);
  },
});
const custom = computed({
  get() {
    return props.custom;
  },
  set(value) {
    emit(UPDATE_CUSTOM, value);
  },
});
</script>
