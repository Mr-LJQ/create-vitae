<template>
  <div>
    <header
      class="fixed left-0 top-0 z-10 w-full h-14 bg-slate-100 transition-all duration-300"
      :class="[drawerVisible ? '' : '-translate-y-14']"
    >
      <h1><!-- logo --></h1>
      <ul class="flex">
        <!-- <li>设置间距</li>
          <li>切换模版</li>
          <li>切换皮肤</li> -->
        <li><button @click="downloadPDF">下载</button></li>
      </ul>
      <span
        class="absolute right-0 -bottom-7 inline-block box-border w-8 h-8 rounded-bl-xl bg-slate-100 cursor-pointer"
        @click="toggleDrawer"
      >
        <ElIcon v-if="!drawerVisible" size="2rem"><ArrowDown /></ElIcon>
        <ElIcon v-else size="2rem"><ArrowUp /></ElIcon>
      </span>
    </header>
    <main>
      <slot :templateRefCallback="templateRefCallback" />
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElIcon } from "element-plus";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
defineOptions({
  name: "ConfigHeader",
});
/**
 * 控制 Drawer 组件的显示与隐藏
 */
const drawerVisible = ref(true);
function toggleDrawer() {
  drawerVisible.value = !drawerVisible.value;
}

/**
 * 此属性用于作用域插槽，其目的在于将其赋值给 简历 模版的最外层元素，
 *  用于为内部的 生成 PDF 逻辑提供支持
 */
const templateRef = ref<HTMLElement | null>(null);
function templateRefCallback(element: HTMLElement | null) {
  templateRef.value = element;
}

/**
 * 下载为 PDF
 */
async function downloadPDF() {}
</script>
