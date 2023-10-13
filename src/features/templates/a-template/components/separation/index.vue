<template>
  <div :class="$style.titleHeader">
    <span :class="$style.contentBox">
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: "Separation",
});
</script>
<style module>
.titleHeader {
  position: relative;
  height: 28px;
  font-size: 15px;
  white-space: nowrap;
}
.titleHeader::before {
  position: absolute;
  display: block;
  left: 0;
  top: 14px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #999;
}
.contentBox {
  position: relative;
  display: inline-block;
  z-index: 2;
  height: 28px;
  padding: 0 20px;
  line-height: 27px;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
  background-color: #284967;
}
.contentBox::before {
  position: absolute;
  display: block;
  left: -5px;
  top: 8px;
  content: "";
  width: 10px;
  height: 10px;
  background-color: #fff;
  transform: rotate(45deg);
}
</style>
