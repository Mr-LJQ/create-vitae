<template>
  <AModule :data-list="store.dataList" :module-name="moduleName" />
</template>
<script lang="ts" setup>
import AModule from "../a-module/index.vue";
import { useInternshipExperienceStore } from "@/stores/internship-experience";
import { propsType } from ".";
defineOptions({
  name: "InternshipExperience",
});
defineProps(propsType);
const store = useInternshipExperienceStore();
</script>
<style></style>
