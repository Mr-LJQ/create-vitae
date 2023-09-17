<template>
  <button :class="[BUTTON_CORE_CLASS]">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { BUTTON_CORE_CLASS } from "@/styles";
defineOptions({
  name: "OperateButton",
});
</script>
