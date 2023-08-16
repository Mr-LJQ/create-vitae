<template>
  <div class="box">
    <b><slot>未定义</slot></b>
    <slot name="switch"></slot>
  </div>
</template>
<script lang="ts" setup>

</script>

<style scoped>
.box {
  box-sizing: border-box;
  float: left;
  padding: 23px 11px 0 9px;
  height: 55px;
  width: 100px;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
  position: relative;
}
b {
  display: block;
  max-width: 80px;
  color: #222;
  text-align: center;
  line-height: 32px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
