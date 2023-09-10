<template>
  <div :class="OVERRIDE_ELEMENT_PLUS">
    <el-config-provider :locale="zhCn">
      <!-- <component :is="ATemplate"></component> -->
      <EditDrawer />
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import EditDrawer from "@/features/editor/index.vue";
//import ATemplate from "@/features/templates/a-template/index.vue";
import { OVERRIDE_ELEMENT_PLUS } from "@/styles";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
