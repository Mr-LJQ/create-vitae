<template>
  <button :class="$style.a">
    <el-icon v-if="!isSpread" color="#13d8a7" size="35px"><ArrowUp /></el-icon>
    <el-icon v-else color="#13d8a7" size="35px"><ArrowDown /></el-icon>
  </button>
</template>
<script lang="ts" setup>
import { ElIcon } from "element-plus";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";
defineProps({
  isSpread: Boolean,
});
</script>
<style module>
.a {
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  padding-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
}

</style>
