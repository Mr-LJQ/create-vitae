<template>
  <button
    class="rounded-md px-4 py-2 text-sm text-white bg-[#409eff] hover:bg-[#79bbff] outline-none focus-visible:outline-[#409eff]"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
defineOptions({
  name: "PrimaryButton",
});
</script>
<style></style>
