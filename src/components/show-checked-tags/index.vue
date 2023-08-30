<template>
  <ul class="flex flex-wrap mt-3">
    <li class="mr-3 mb-2" :key="tag" v-for="tag of tags">
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
</template>
<script lang="ts" setup>
import { ElTag } from "element-plus";
import { propsType } from ".";
defineOptions({
  name: "ShowCheckedTags",
});
defineProps(propsType);
</script>
