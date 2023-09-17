<template>
  <div :class="$style.titleHeader">
    <span :class="$style.contentBox">
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
import "@/assets/fonts/iconfont.css";
defineOptions({
  name: "Separation",
});
</script>
<style module>
.titleHeader {
  height: 28px;
  font-size: 15px;
  font-weight: 400;
  position: relative;
  white-space: nowrap;
}
.titleHeader::before {
  display: block;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #999;
  position: absolute;
  left: 0;
  top: 14px;
}
.contentBox {
  display: inline-block;
  position: relative;
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
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  left: -5px;
  top: 8px;
  background-color: #eee;
  transform: rotate(45deg);
}
</style>
