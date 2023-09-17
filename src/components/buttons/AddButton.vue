<template>
  <el-button round type="primary" size="large" :class="$style.a">
    新增一条 <slot />
  </el-button>
</template>
<script lang="ts" setup>
import { ElButton } from "element-plus";
defineOptions({ name: "AddButton" });
</script>
<style module>
.a {
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
