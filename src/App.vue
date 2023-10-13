<template>
  <div class="bg-[#39394d] pt-16">
    <ElConfigProvider :locale="zhCn">
      <MenuHeader />
      <component :is="ATemplate"></component>
      <!-- <EditDrawer /> -->
    </ElConfigProvider>
  </div>
</template>
<script lang="ts" setup>
import MenuHeader from "@/features/menu-header/index.vue";
//import EditDrawer from "@/features/editor/index.vue";
import { ATemplate } from "@/features/templates";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
