<template>
  <button class="w-24 h-7 rounded-2xl bg-white mr-2 mb-2">
    <slot />
  </button>
</template>
<script lang="ts" setup>
defineOptions({
  name: "OperateButton",
});
</script>
