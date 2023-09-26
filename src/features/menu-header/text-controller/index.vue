<template>
  <Popover as="div" class="relative h-full">
    <PopoverButton icon-name="font">字体语言</PopoverButton>
    <PopoverPanel
      :class="$style.shadow"
      class="absolute -translate-x-1/2 left-1/2 w-64 pt-5 px-7 bg-white"
    >
      <div
        :key="name"
        :label-text="title"
        class="flex mb-2"
        v-for="{ title, name, options } of _options"
      >
        <label class="w-16 shrink-0 mr-2" :for="`text-controller-${title}`">{{
          title
        }}</label>
        <ElSelect :id="`text-controller-${title}`" v-model="store[name]">
          <ElOption
            :label="value"
            :value="value"
            :key="value"
            v-for="value of options"
          />
        </ElSelect>
      </div>
    </PopoverPanel>
  </Popover>
</template>
<script lang="ts" setup>
import { PopoverButton } from "@/components";
import { Popover, PopoverPanel } from "@headlessui/vue";
import { ElSelect, ElOption } from "element-plus";
import { useConfigurationStore } from "@/stores";
import { options as _options } from ".";

defineOptions({
  name: "TextController",
});
const store = useConfigurationStore();
</script>
<style module>
.shadow {
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
}
</style>
