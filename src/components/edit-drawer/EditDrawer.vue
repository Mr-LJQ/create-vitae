<template>
  <div :class="$style.a" :style="isSpread ? 'transform:translateY(0)' : ''">
    <SpreadButton
      :class="$style.b"
      @click="handleClick"
      :is-spread="isSpread"
    />
    <Tabs></Tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Tabs from "@/components/edit-tabs/index.vue";
import SpreadButton from "./SpreadButton.vue";

const isSpread = ref(false);
function handleClick() {
  isSpread.value = !isSpread.value;
}
</script>
<style module>
.a {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
  transform: translateY(calc(100% - 55px)); /* 55px 是 TabsLabel的高度 */
  transition: all 0.3s ease-out 0s;
}
.b {
  position: absolute;
  left: 50%;
  top: -35px;
  z-index: 1;
  margin-left: -40px;
  transition: all 0.2s ease-out 0s;
}
.b:hover {
  top: -40px;
}
</style>
