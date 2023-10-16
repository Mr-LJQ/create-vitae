<template>
  <span :style="spanStyle" :class="$style.tag"><slot /></span>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useConfigurationStore } from "@/stores";
defineOptions({
  name: "Tag",
});
const store = useConfigurationStore();
const spanStyle = computed(() => {
  return {
    "background-color": store.templateColor,
    "border-color": store.templateColor,
  };
});
</script>
<style module>
.tag {
  position: relative;
  z-index: 1;
  display: inline-block;
  border-radius: 16px;
  border: 1px solid #eee;
  background-color: #eee;
  color: white;
  @apply my-1 mr-4 py-1 px-3;
}
</style>
