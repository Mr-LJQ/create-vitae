<template>
  <AModule :data-list="store.dataList" :module-name="moduleName" />
</template>
<script lang="ts" setup>
import AModule from "../../components/a-module/index.vue";
import { useEducationalBackgroundStore } from "@/stores/educational-background";
import { propsType } from ".";
defineOptions({
  name: "EducationalExperience",
});
defineProps(propsType);
const store = useEducationalBackgroundStore();
</script>
