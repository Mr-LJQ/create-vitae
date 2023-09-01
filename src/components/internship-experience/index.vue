<template>
  <AModule
    :firstItem="firstItem"
    :secondItem="secondItem"
    :thirdItem="thirdItem"
    :placeholder="placeholder"
    :dataList="store.dataList"
    :defaultTimeValue="defaultTimeValue"
    :deleteItem="deleteItem"
    :addNewItem="addNewItem"
    :moveUpItem="moveUpItem"
    :moveDownItem="moveDownItem"
    :moduleName="moduleName"
  />
</template>
<script lang="ts" setup>
import AModule from "@/components/share-modules/a-module/index.vue";
import { useInternshipExperienceStore } from "@/stores/internship-experience";
import { firstItem, secondItem, thirdItem, placeholder, propsType,defaultTimeValue } from ".";
defineProps(propsType);
defineOptions({
  name: "internshipExperience",
});
const store = useInternshipExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
