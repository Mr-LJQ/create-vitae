<template>
  <li :class="EDIT_INPUT_ITEM_LI">
    <label :class="EDIT_INPUT_ITEM_LABEL" :for="forId">{{ labelText }}</label>
    <slot />
  </li>
</template>
<script lang="ts" setup>
import { editItemProps } from ".";
import { EDIT_INPUT_ITEM_LI, EDIT_INPUT_ITEM_LABEL } from "@/styles";
defineProps(editItemProps);
defineOptions({
  name:"EditInputItem"
})
</script>
<style></style>
