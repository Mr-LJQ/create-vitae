<template>
  <input
    type="text"
    ref="inputRef"
    v-model="value"
    :class="EDIT_INPUT_ITEM_INPUT"
  />
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { isString } from "@/utils";
import { EDIT_INPUT_ITEM_INPUT } from "@/styles";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
defineOptions({ name: "EditInput" });
const emit = defineEmits({
  "update:modelValue": (payload: string) => isString(payload),
});
const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

/**
 * 对外暴露 focus 函数
 */

const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
});
</script>
