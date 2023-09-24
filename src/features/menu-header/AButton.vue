<template>
  <button
    class="px-2 text-[#13d8a7] leading-8 focus:outline-[#13d8a7] focus:bg-[rgba(19,216,167,.1)] focus:text-[#13a783] hover:text-[#13a783] hover:bg-[rgba(19,216,167,.1)] border-[#13d8a7] border rounded-full"
  >
    <span
      class="text-xl align-middle"
      :class="`icon-common-${iconName}`"
    ></span>
    <span><slot /></span>
  </button>
</template>
<script lang="ts" setup>
defineOptions({
  name: "AButton",
});
defineProps({
  iconName: {
    type: String,
    required: true,
  },
} as const);
</script>
