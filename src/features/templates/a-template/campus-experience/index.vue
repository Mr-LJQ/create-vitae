<template>
  <AModule :data-list="store.dataList" :module-name="moduleName" />
</template>
<script lang="ts" setup>
import AModule from "../a-module/index.vue";
import { useCampusExperienceStore } from "@/stores/campus-experience";
import { propsType } from ".";
defineOptions({
  name: "CampusExperience",
});
defineProps(propsType);
const store = useCampusExperienceStore();
</script>
