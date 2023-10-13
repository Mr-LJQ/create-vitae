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
import { useCampusExperienceStore } from "@/stores";
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
  name: "campusExperience",
});
const store = useCampusExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
