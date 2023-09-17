<template>
  <AModule :data-list="store.dataList" :module-name="moduleName" />
</template>
<script lang="ts" setup>
import AModule from "../a-module/index.vue";
import { useProjectExperienceStore } from "@/stores/project-experience";
import { propsType } from ".";
defineOptions({
  name: "ProjectExperience",
});
defineProps(propsType);
const store = useProjectExperienceStore();
</script>
<style></style>
