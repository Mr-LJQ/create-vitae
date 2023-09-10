<template>
  <AModule
    :firstItem="firstItem"
    :secondItem="secondItem"
    :thirdItem="thirdItem"
    :placeholder="placeholder"
    :defaultTimeValue="defaultTimeValue"
    :dataList="store.dataList"
    :deleteItem="deleteItem"
    :addNewItem="addNewItem"
    :moveUpItem="moveUpItem"
    :moveDownItem="moveDownItem"
    :moduleName="moduleName"
  />
</template>
<script lang="ts" setup>
import AModule from "@/components/share-modules/a-module/index.vue";
import { useProjectExperienceStore } from "@/stores/project-experience";
import { firstItem, secondItem, thirdItem, placeholder, propsType,defaultTimeValue } from ".";
defineProps(propsType);
defineOptions({
  name: "ProjectExperience",
});
const store = useProjectExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
