<template>
  <Popover as="div" class="relative h-full">
    <PopoverButton icon-name="line_padding">设置间距</PopoverButton>
    <PopoverPanel
      :class="$style.shadow"
      class="absolute -translate-x-1/2 left-1/2 w-64 pt-5 px-7 bg-white"
    >
      <div
        :key="title"
        v-for="{ title, name, min, max, step, defaultValue } of options"
      >
        <h5>
          {{ title }}：<b class="text-[#f60]">{{ store[name] }}</b>
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
import { PopoverButton } from "@/components";
import { Popover, PopoverPanel } from "@headlessui/vue";
import { ElSlider } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { options } from ".";
defineOptions({
  name: "GapController",
});
const store = useConfigurationStore();
</script>

<style module>
.shadow {
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
}
</style>
