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
import { useWorkExperienceStore } from "@/stores";
import { AModule } from "@/components";
import {
  firstItem,
  secondItem,
  thirdItem,
  propsType,
  placeholder,
  defaultTimeValue,
} from ".";
defineProps(propsType);
defineOptions({
  name: "WorkExperience",
});
const store = useWorkExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
