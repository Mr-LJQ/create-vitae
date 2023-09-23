<template>
  <div class="mt-3">
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      class="mt-3"
      :content="store.content"
      v-if="!isEmptyDelta(store.content)"
    />
    <ul class="grid grid-cols-3">
      <li :key="tag" class="mt-1" v-for="[tag, options] of store.tags">
        <ElProgress
          class="h-4"
          :percentage="getPercentage(options.proficiency)"
          :format="() => format(options)"
        />
        <p class="m-0 font-bold">{{ tag }}</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ElProgress } from "element-plus";
import Separation from "../../components/separation/index.vue";
import { isEmptyDelta } from "@/utils";
import ReadOnlyRichText from "@/components/read-only-rich-text/index.vue";
import { useSpecialtyStore } from "@/stores/specialty";
import { propsType } from ".";
import type { Proficiency, Presentation } from "@/types";
defineOptions({
  name: "SpecialSkill",
});
defineProps(propsType);
const store = useSpecialtyStore();

/**
 * 将 文本 映射到相应的 百分比
 */
const percentageMap: Record<Proficiency[number], number> = {
  一般: 50,
  良好: 65,
  熟练: 80,
  擅长: 85,
  精通: 95,
};

/**
 * 用于处理显示 百分比 还是 显示文本 的逻辑
 */
const format = (options: {
  proficiency: Proficiency[number];
  presentation: Presentation[number];
}) => {
  const { proficiency, presentation } = options;
  return presentation === "文字"
    ? proficiency
    : percentageMap[proficiency] + "%";
};
/**
 * 将 文本 转换为 百分比
 */
function getPercentage(proficiency: Proficiency[number]) {
  return percentageMap[proficiency];
}
</script>
