<template>
  <Popover as="div" class="relative h-full">
    <PopoverButton icon-name="skin">皮肤设置</PopoverButton>
    <PopoverPanel
      :class="$style.shadow"
      class="absolute -translate-x-1/2 left-1/2 w-44 pt-5 px-7 bg-white"
    >
      <RadioGroup v-model="store.templateColor">
        <RadioGroupLabel class="mb-1">预定义颜色</RadioGroupLabel>
        <div class="flex flex-wrap justify-between w-28 mt-1 mx-auto">
          <RadioGroupOption
            :key="color"
            class="outline-none"
            v-slot="{ checked }"
            :value="`#${color}`"
            v-for="color of colors"
          >
            <span
              :style="[
                { backgroundColor: `#${color}` },
                checked ? `outline-color:#${color}` : '',
              ]"
              class="inline-block w-6 h-6 outline-none"
            ></span>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <div>
        <label class="mr-2" for="skin-controller-color-picker"
          >自定义颜色</label
        >
        <ElColorPicker
          id="skin-controller-color-picker"
          v-model="store.templateColor"
        />
      </div>
    </PopoverPanel>
  </Popover>
</template>
<script lang="ts" setup>
import { PopoverButton } from "@/components";
import {
  Popover,
  PopoverPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { ElColorPicker } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { colors } from ".";

defineOptions({
  name: "SkinController",
});
const store = useConfigurationStore();
</script>
<style module>
.shadow {
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
}
</style>
