<template>
  <li>
    <label :for="forId">{{ labelText }}</label>
    <slot />
  </li>
</template>
<script lang="ts" setup>
import { editItemProps } from "./index";
defineProps(editItemProps);
</script>
<style>
  
</style>
