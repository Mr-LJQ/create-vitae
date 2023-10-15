<template>
  <section>
    <Separation>{{ moduleName }}</Separation>
    <div :key="item.id" v-for="item of dataList">
      <ul class="flex justify-between leading-relaxed">
        <li class="flex-1 text-left font-bold">
          {{ convertTimeRange(item) }}
        </li>
        <li class="flex-1 text-center font-bold">{{ item.first }}</li>
        <li class="flex-1 text-right font-bold">{{ handleThird(item) }}</li>
      </ul>
      <ReadOnlyRichText
        :content="item.editorContent"
        v-if="!isEmptyDelta(item.editorContent)"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import Separation from "../separation/index.vue";
import ReadOnlyRichText from "@/components/read-only-rich-text/index.vue";
import { isEmptyDelta } from "@/utils";
import type { AModuleData } from "@/types";
import { propsType } from ".";
defineOptions({
  name: "AModule",
});
defineProps(propsType);

/**
 * 处理时间
 */
function convertTimeRange(item: AModuleData) {
  const { timeRange, isHitherto } = item;
  if (timeRange == null) return "";
  const [start, end] = timeRange;
  const begin = `${start.getFullYear()}-${start.getMonth() + 1}`;
  const finish = isHitherto
    ? "至今"
    : `${end.getFullYear()}-${end.getMonth() + 1}`;
  return `${begin} ~ ${finish}`;
}
/**
 * 处理特殊的 third
 */
function handleThird(item: AModuleData) {
  let { second, third } = item;
  second = second.trim();
  third = third?.trim();
  if (second && third) {
    return `${second}（${third}）`;
  } else if (second) {
    return second;
  } else if (third) {
    return `学历：${third}`;
  }
  return item.second;
}
</script>
