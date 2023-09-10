<template>
  <div>
    <Separation>{{ moduleName }}</Separation>
    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <QuillEditor />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Separation from "../separation/index.vue";
import { QuillEditor } from "@vueup/vue-quill";
import { propsType } from ".";
defineOptions({
  name: "AModule",
});
defineProps(propsType);
</script>
<style></style>
