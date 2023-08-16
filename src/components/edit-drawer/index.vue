<template>
  <div class="drawer">
    <button class="btn">
      <el-icon size="20" color="#13d8a7"><ArrowUp /></el-icon>
    </button>
    <Tabs></Tabs>
  </div>
</template>
<script lang="ts" setup>
import Tabs from "@/components/edit-tabs/index.vue";
import {ElIcon} from "element-plus"
import { ArrowUp } from "@element-plus/icons-vue";
</script>
<style scoped>
.drawer {
  position: fixed;
  left: 0;
  bottom: 0;
  width:100%;
  box-shadow: 0 0 20px rgb(0,0,0,.2);
  transition: all .3s ease-out 0s;
}
.btn {
  position: absolute;
  left: 50%;
  top: -35px;
  z-index: 1;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  border-radius: 50%;
  border: none;
  color: #13d8a7;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  font-size: 20px;
  transition: all 0.2s ease-out 0s;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
}
</style>
