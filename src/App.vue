<template>
  <div class="bg-[#39394d] pt-16 pb-24">
    <ElConfigProvider :locale="zhCn">
      <MenuHeader />
      <main
        :style="templateStyle"
        class="relative w-[51.25rem] mx-auto bg-white"
        ref="vitaeTemplateContainerRef"
        :id="VITAE_TEMPLATE_CONTAINER_ID"
      >
        <component :is="ATemplate"></component>
        <div
          :key="index"
          v-for="(data, index) of paginationLineData"
          :style="{ top: data.offsetY }"
          class="print:hidden flex justify-between absolute z-[2] inset-x-0 -translate-y-1/2 text-white text-sm leading-6 bg-[#39394d]"
        >
          <p>分页行：用于判断PDF分页，应该避免该行遮盖任何内容</p>
          <span>{{ data.index }}/{{ data.pageCount }}</span>
          <button>调整页数</button>
        </div>
      </main>

      <EditDrawer />
    </ElConfigProvider>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useResizeObserver, useEventListener } from "@vueuse/core";

import { useConfigurationStore, useBasicInfosStore } from "@/stores";
import MenuHeader from "@/features/menu-header/index.vue";
import EditDrawer from "@/features/editor/index.vue";
import { ATemplate } from "@/features/templates";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

/**
 * 应用用户的相关配置
 */
const store = useConfigurationStore();
const basicInfosStore = useBasicInfosStore();
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

/**
 * 实现分页功能
 */

const A4Height = 1160; //72.5rem 1160px
const vitaeTemplateContainerRef = ref<HTMLElement | null>(null);
interface PaginationLineData {
  index: number;
  offsetY: string;
  pageCount: number;
}
const paginationLineData = ref<PaginationLineData[]>([]);
function handlePaginationLineData(pageCount: number) {
  const length = paginationLineData.value.length;
  if (length === pageCount - 1) return;
  //这意味着，存在多余的分页行，因此移除多余的分页行
  if (length > pageCount - 1)
    return (paginationLineData.value.length = pageCount - 1);
  //这意味着，分页行不足，此时需要生成额外的分页行
  while (paginationLineData.value.length < pageCount - 1) {
    const index = paginationLineData.value.length + 1;
    paginationLineData.value.push({
      index,
      pageCount,
      offsetY: index * 72.5 + "rem",
    });
  }
}
useResizeObserver(vitaeTemplateContainerRef, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  const pageCount = Math.ceil(height / A4Height);

  handlePaginationLineData(pageCount);
});

/**
 * 处理打印相关逻辑
 */
const VITAE_TEMPLATE_CONTAINER_ID = "VITAE_TEMPLATE_CONTAINER_ID";
onMounted(() => {
  let vitaeTemplateContainer: HTMLElement | null = null;
  let fragment = document.createDocumentFragment();
  const placeholderCommentNode = document.createComment("");
  let documentTitle = "";
  useEventListener(window, "beforeprint", () => {
    vitaeTemplateContainer = document.getElementById(
      VITAE_TEMPLATE_CONTAINER_ID,
    );
    if (!vitaeTemplateContainer)
      throw new Error(
        "Unexpected BUG, unable to obtain elements representing resume templates",
      );
    documentTitle = document.title;
    const name = basicInfosStore.name;
    document.title = name ? `${name}-简历` : documentTitle;
    vitaeTemplateContainer.replaceWith(placeholderCommentNode);
    fragment.append(...document.body.childNodes);
    document.body.append(vitaeTemplateContainer);
  });

  useEventListener(window, "afterprint", () => {
    if (!vitaeTemplateContainer)
      throw new Error(
        "Unexpected BUG, unable to obtain elements representing resume templates",
      );
    document.title = documentTitle;
    vitaeTemplateContainer.remove();
    document.body.append(fragment);
    placeholderCommentNode.replaceWith(vitaeTemplateContainer);
  });
});
</script>
