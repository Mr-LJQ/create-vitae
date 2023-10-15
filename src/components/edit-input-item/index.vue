<template>
  <li :class="EDIT_INPUT_ITEM_LI" ref="containerRef">
    <label :class="EDIT_INPUT_ITEM_LABEL" :for="id">{{ labelText }}</label>
    <slot :id="id" />
  </li>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { editItemProps } from ".";
import { EDIT_INPUT_ITEM_LI, EDIT_INPUT_ITEM_LABEL } from "@/styles";
import { useId } from "@/hooks";
defineProps(editItemProps);
defineOptions({
  name: "EditInputItem",
});
const id = useId();
const containerRef = ref<HTMLElement | null>(null);

defineExpose({
  el: containerRef,
  $el: containerRef,
});
</script>
<style></style>
