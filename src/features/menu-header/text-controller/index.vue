<template>
  <Popover>
    <PopoverButton icon-name="font">字体语言</PopoverButton>
    <PopoverTransition>
      <PopoverPanel class="w-64">
        <div class="pt-5 px-7">
          <div
            :key="name"
            :label-text="title"
            class="flex items-center mb-4"
            v-for="{ title, name, options } of _options"
          >
            <label
              class="w-16 shrink-0 mr-2"
              :for="`text-controller-${title}`"
              >{{ title }}</label
            >
            <ElSelect :id="`text-controller-${title}`" v-model="store[name]">
              <ElOption
                :label="value"
                :value="value"
                :key="value"
                v-for="value of options"
              />
            </ElSelect>
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
import { ElSelect, ElOption } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { options as _options } from ".";

defineOptions({
  name: "TextController",
});
const store = useConfigurationStore();
</script>
