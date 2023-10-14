<template>
  <Popover as="div" class="relative h-full">
    <slot />
  </Popover>
</template>
<script lang="ts" setup>
import { Popover } from "@headlessui/vue";
defineOptions({
  name: "Popover",
});
</script>
