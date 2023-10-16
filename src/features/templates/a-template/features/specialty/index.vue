<template>
  <section>
    <Separation>{{ moduleName }}</Separation>
    <ReadOnlyRichText
      :content="store.content"
      v-if="!isEmptyDelta(store.content)"
    />
    <ul class="grid grid-cols-3" v-if="store.tags.size">
      <li :key="tag" v-for="[tag, options] of store.tags">
        <ElProgress
          class="h-4"
          :color="config.templateColor"
          :percentage="getPercentage(options.proficiency)"
          :format="() => format(options)"
        />
        <p class="font-bold">{{ tag }}</p>
      </li>
    </ul>
  </section>
</template>
<script lang="ts" setup>
import { ElProgress } from "element-plus";
import { isEmptyDelta } from "@/utils";
import { useSpecialtyStore, useConfigurationStore } from "@/stores";
import { ReadOnlyRichText } from "@/components";
import type { Proficiency, Presentation } from "@/types";
import Separation from "../../components/separation/index.vue";
import { propsType } from ".";
defineOptions({
  name: "SpecialSkill",
});
defineProps(propsType);
const store = useSpecialtyStore();

const config = useConfigurationStore();

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
