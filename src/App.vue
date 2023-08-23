<template>
  <el-config-provider :locale="zhCn">
    <EditDrawer />
  </el-config-provider>
</template>
<script lang="ts" setup>
import EditDrawer from "@/components/edit-drawer/EditDrawer.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
