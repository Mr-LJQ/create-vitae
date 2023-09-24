<template>
  <button
    :class="$style.shadow"
    class="w-16 h-full outline-none hover:text-[#13d8a7] text-[#13a783]"
  >
    <span
      :class="`icon-common-${iconName}`"
      class="block text-[1.5rem] h-8"
    ></span>
    <span class="block text-sm">
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>
defineOptions({
  name: "MenuButton",
});
defineProps({
  iconName: {
    type: String,
    required: true,
  },
} as const);
</script>
<style module>
.shadow:focus {
  color: #13d8a7;
  box-shadow: 0 -8px 10px rgba(0, 0, 0, 0.2);
}
</style>
