<template>
  <PopoverButton as="template" v-slot="{ open }">
    <button
      :class="[$style.focus, open && $style.shadow, open && 'z-[1]']"
      class="relative w-16 h-full outline-none bg-white hover:text-[#13d8a7] text-[#13a783]"
    >
      <span
        :class="`icon-common-${iconName}`"
        class="block text-[1.5rem] h-8"
      ></span>
      <span class="block text-sm">
        <slot />
      </span>
    </button>
  </PopoverButton>
</template>
<script lang="ts" setup>
import { PopoverButton } from "@headlessui/vue";
defineOptions({
  name: "PopoverButton",
});
defineProps({
  iconName: {
    type: String,
    required: true,
  },
} as const);
</script>
<style module>
.shadow,
.focus:focus {
  color: #13d8a7;
  box-shadow: 0 -8px 10px rgba(0, 0, 0, 0.2);
}
</style>
