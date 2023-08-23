<template>
  <input type="text" v-model="value" :class="EDIT_INPUT_ITEM_INPUT" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { isString } from "@/utils";
import { EDIT_INPUT_ITEM_INPUT } from "@/styles";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
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
</script>

