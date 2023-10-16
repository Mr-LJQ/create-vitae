<template>
  <div :style="separationStyle" :class="$style.titleHeader">
    <span :style="contentStyle" :class="$style.contentBox">
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useConfigurationStore } from "@/stores";
defineOptions({
  name: "Separation",
});
const store = useConfigurationStore();
const separationStyle = computed(() => {
  return {
    "margin-top": `${store.moduleGap}px`,
    "margin-bottom": `${store.moduleGap}px`,
  };
});
const contentStyle = computed(() => {
  return {
    "background-color": `${store.templateColor}`,
  };
});
</script>
<style module>
.titleHeader {
  position: relative;
  font-size: 1.1em;
  white-space: nowrap;
  @apply h-7;
}
.titleHeader::before {
  position: absolute;
  display: block;
  left: 0;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #999;
  @apply top-3;
}
.contentBox {
  z-index: 1;
  position: relative;
  display: inline-block;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
  @apply h-7 px-5 leading-7;
}
.contentBox::before {
  content: "";
  position: absolute;
  display: block;
  background-color: #fff;
  transform: rotate(45deg);
  @apply -left-1 top-2 w-2 h-2;
}
</style>
