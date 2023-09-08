<template>
  <div class="max-w-[1200px] mx-auto">
    <RichTextEditor
      class="max-h-56"
      :placeholder="placeholder"
      v-model="content"
    />
    <div :class="$style.tagContainer">
      <el-tag
        v-for="tag of presetTags"
        :class="[$style.tag, hasTag(tag) ? 'checked' : '']"
        round
        :key="tag"
        effect="plain"
        @click="handleToggleTag(tag)"
        >{{ tag }}</el-tag
      >
    </div>
    <div>
      <EditInput
        class="mr-4"
        v-model="custom"
        ref="customElementRef"
        placeholder="请输入自定义名称"
      />
      <el-button @click="handleAddCustom" type="primary" round :icon="Plus"
        >添加自定义 {{ moduleName }}</el-button
      >
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElButton, ElNotification, ElTag } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import EditInput from "@/components/edit-input/index.vue";
import { propsType, emitsType, UPDATE_CONTENT } from ".";
const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "TagModule",
});

/*
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

/*
 * 处理预定义tag的选中切换逻辑
 */
const { hasTag, addTag, deleteTag } = props;
function handleToggleTag(tag: string) {
  if (hasTag(tag)) {
    deleteTag(tag);
  } else {
    addTag(tag);
  }
}

/*
 * 处理自定义tag的添加逻辑
 */
const custom = ref("");
const customElementRef = ref<HTMLInputElement | null>(null);
function handleAddCustom() {
  const currentTag = custom.value.trim();
  //避免添加空项
  if (currentTag === "") {
    customElementRef.value?.focus();
    return;
  }
  //避免重复添加
  if (hasTag(currentTag)) {
    ElNotification.warning({
      title: "提醒",
      message: `标签名称：${currentTag} 已经添加，重复添加无效。`,
      position: "top-left",
      offset: 100,
    });
    return;
  }
  addTag(currentTag);
  //清空，以便于用户再次输入
  custom.value = "";
}
</script>
<style module>
.tagContainer {
  max-width: 1200px;
  padding-top: 12px;
  margin: 0 auto 10px;
  border-top: 1px dashed #ffc69f;
}
.tag {
  color: #333;
  cursor: pointer;
  margin: 0 10px 10px 0;
  border: 1px solid #ddd;
}
.tag:hover {
  color: #409eff;
  border-color: #409eff;
}
.tag:global(.checked) {
  color: #fff;
  background-color: #409eff;
}
</style>
