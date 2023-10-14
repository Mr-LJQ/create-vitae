<template>
  <Popover>
    <PopoverButton icon-name="skin">皮肤设置</PopoverButton>
    <PopoverTransition>
      <PopoverPanel class="w-96">
        <div class="py-2 px-7">
          <RadioGroup v-model="store.templateColor">
            <RadioGroupLabel class="mb-1">
              皮肤颜色：<ElColorPicker
                id="skin-controller-color-picker"
                v-model="store.templateColor"
              />
            </RadioGroupLabel>
            <div class="grid gap-x-2 gap-y-1 grid-cols-8 my-2">
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
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { ElColorPicker } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { colors } from ".";

defineOptions({
  name: "SkinController",
});
const store = useConfigurationStore();
</script>
