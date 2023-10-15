<template>
  <div class="bg-[#39394d] pt-16">
    <ElConfigProvider :locale="zhCn">
      <MenuHeader />
      <component
        :is="ATemplate"
        :style="templateStyle"
        :id="VITAE_TEMPLATE_CONTAINER_ID"
      ></component>
      <EditDrawer />
    </ElConfigProvider>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useConfigurationStore } from "@/stores";
import { VITAE_TEMPLATE_CONTAINER_ID } from "@/constants";
import MenuHeader from "@/features/menu-header/index.vue";
import EditDrawer from "@/features/editor/index.vue";
import { ATemplate } from "@/features/templates";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

/**
 * 应用用户的相关配置
 */
const store = useConfigurationStore();
const { templateEdgeGap, fontSize, fontFamily, lineGap } = storeToRefs(store);
const templateStyle = computed(() => {
  return {
    "padding-left": `${templateEdgeGap.value}px`,
    "padding-right": `${templateEdgeGap.value}px`,
    "font-size": `${fontSize.value}px`,
    "font-family": `${fontFamily.value}`,
    "line-height": lineGap.value + 1,
  };
});
</script>
