<template>
  <Popover as="div" class="relative h-full">
    <PopoverButton icon-name="line_padding">设置间距</PopoverButton>
    <PopoverPanel
      :class="$style.shadow"
      class="absolute -translate-x-1/2 left-1/2 w-64 pt-5 px-7 bg-white"
    >
      <div
        class="p-1"
        :key="title"
        v-for="{ title, name, min, max, step, defaultValue } of options"
      >
        <h5>
          {{ title }}<b class="text-[#f60]">{{ store[name] }}</b>
        </h5>
        <div class="flex items-center mb-1">
          <ElSlider
            class="w-32"
            style="--el-slider-button-size: 14px"
            v-model="store[name]"
            :min="min"
            :max="max"
            :step="step"
          /><button
            @click="store[name] = defaultValue"
            v-if="defaultValue !== store[name]"
            class="focus-visible:outline-[#13d8a7] hover:text-[$13d8a7] hover:bg-[#13d8a710] h-7 w-14 text-xs rounded-sm ml-2 outline-none shrink-0 border"
          >
            重置
          </button>
        </div>
      </div>
    </PopoverPanel>
  </Popover>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { PopoverButton } from "@/components";
import { Popover, PopoverPanel } from "@headlessui/vue";
import { ElSlider } from "element-plus";
import { useConfigurationStore } from "@/stores";
import type { GapControllerType } from "@/stores";
defineOptions({
  name: "GapController",
});
const store = useConfigurationStore();

interface OptionType {
  title: string;
  name: keyof GapControllerType;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

const options = computed<OptionType[]>(() => {
  return [
    {
      title: "文本行间距",
      name: "lineGap",
      min: 0.3,
      max: 1.2,
      step: 0.1,
      defaultValue: 0.7,
    },
    {
      title: "模块上下间距",
      name: "moduleGap",
      min: 5,
      max: 50,
      step: 1,
      defaultValue: 20,
    },
    {
      title: "简历模版边距",
      name: "templateEdgeGap",
      min: 10,
      max: 50,
      step: 1,
      defaultValue: 30,
    },
  ];
});
</script>

<style module>
.shadow {
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
}
</style>
