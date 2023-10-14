<template>
  <Popover>
    <PopoverButton icon-name="line_padding">设置间距</PopoverButton>
    <PopoverTransition>
      <PopoverPanel class="w-96">
        <div class="p-3">
          <div
            class="grid grid-cols-3 items-center py-1"
            :key="title"
            v-for="{ title, name, min, max, step, defaultValue } of options"
          >
            <label :for="`${PREFIX_ID}_${name}`">{{ title }}：</label>
            <ElSlider
              :id="`${PREFIX_ID}_${name}`"
              class="w-32"
              style="--el-slider-button-size: 14px"
              v-model="store[name]"
              :min="min"
              :max="max"
              :step="step"
            /><button
              @click="store[name] = defaultValue"
              v-if="defaultValue !== store[name]"
              class="focus-visible:outline-[#409eff] hover:bg-gray-50 h-7 w-14 text-xs rounded-sm mx-auto outline-none shrink-0 border"
            >
              重置
            </button>
          </div>
        </div>
      </PopoverPanel>
    </PopoverTransition>
  </Popover>
</template>
<script lang="ts" setup>
import {
  Popover,
  PopoverPanel,
  PopoverButton,
  PopoverTransition,
} from "@/components";
import { ElSlider } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { options } from ".";
defineOptions({
  name: "GapController",
});
const store = useConfigurationStore();
const PREFIX_ID = "gap_controller";
</script>
