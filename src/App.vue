<template>
  <div class="bg-[#39394d] pt-8" :class="OVERRIDE_ELEMENT_PLUS">
    <ElConfigProvider :locale="zhCn">
      <ConfigHeader v-slot="{ templateRefCallback }">
        <!-- ref 的回调函数写法，该语法是正确的，但 ts 错误的的报错，该报错暂时没有更优雅的处理方法  -->
        <div class="vitae" :ref="templateRefCallback">
          <component :is="ATemplate"></component>
        </div>
      </ConfigHeader>
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
