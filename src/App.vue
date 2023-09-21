<template>
  <div class="bg-[#39394d] pt-8" :class="OVERRIDE_ELEMENT_PLUS">
    <ElConfigProvider :locale="zhCn">
      <ConfigHeader />
      <component :is="ATemplate"></component>
      <EditDrawer />
    </ElConfigProvider>
  </div>
</template>
<script lang="ts" setup>
import ConfigHeader from "@/features/config-header/index.vue";
import EditDrawer from "@/features/editor/index.vue";
import ATemplate from "@/features/templates/a-template/index.vue";
import { OVERRIDE_ELEMENT_PLUS } from "@/styles";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
