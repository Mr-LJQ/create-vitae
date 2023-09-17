<template>
  <span :class="$style.tag"><slot /></span>
</template>
<script lang="ts" setup>
defineOptions({
  name: "TagComponent",
});
</script>
<style module>
.tag {
  display: inline-block;
  border-radius: 16px;
  z-index: 2;
  position: relative;
  border: 1px solid #eee;
  background-color: #eee;
  color: #555;
  @apply my-1 mr-4 py-1 px-3;
}
</style>
