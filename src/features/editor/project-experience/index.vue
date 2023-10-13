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
import { AModule } from "@/components";
import { useProjectExperienceStore } from "@/stores";
import {
  firstItem,
  secondItem,
  thirdItem,
  placeholder,
  propsType,
  defaultTimeValue,
} from ".";
defineProps(propsType);
defineOptions({
  name: "ProjectExperience",
});
const store = useProjectExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
