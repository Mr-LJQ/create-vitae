<template>
  <AModule :data-list="store.dataList" :module-name="moduleName" />
</template>
<script lang="ts" setup>
import AModule from "../a-module/index.vue";
import { useWorkExperienceStore } from "@/stores/work-experience";
import { propsType } from ".";
defineOptions({
  name: "WorkExperience",
});
defineProps(propsType);
const store = useWorkExperienceStore();
</script>
<style></style>
