<template>
  <li :class="EDIT_INPUT_ITEM_LI">
    <label :class="EDIT_INPUT_ITEM_LABEL" :for="id">{{ labelText }}</label>
    <slot :id="id" />
  </li>
</template>
<script lang="ts" setup>
import { editItemProps } from ".";
import { EDIT_INPUT_ITEM_LI, EDIT_INPUT_ITEM_LABEL } from "@/styles";
import { useId } from "@/hooks";
defineProps(editItemProps);
defineOptions({
  name: "EditInputItem",
});
const id = useId();
</script>
<style></style>
