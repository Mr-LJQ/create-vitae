<template>
  <PopoverPanel class="absolute z-10 left-1/2 -translate-x-1/2 mt-3 bg-white">
    <div
      class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <slot />
    </div>
  </PopoverPanel>
</template>
<script lang="ts" setup>
import { PopoverPanel } from "@headlessui/vue";
defineOptions({
  name: "PopoverPanel",
});
</script>
