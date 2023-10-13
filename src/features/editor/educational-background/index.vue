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
    v-slot="{ index }"
  >
    <EditInputItem label-text="学历" v-slot="{ id }">
      <el-select
        :id="id"
        v-model="store.dataList[index].third"
        placeholder="不填"
      >
        <el-option
          v-for="item of degrees"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </EditInputItem>
  </AModule>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption } from "element-plus";
import { EditInputItem, AModule } from "@/components";
import { useEducationalBackgroundStore } from "@/stores";
import {
  firstItem,
  secondItem,
  thirdItem,
  placeholder,
  propsType,
  degrees,
  defaultTimeValue,
} from ".";
defineProps(propsType);
defineOptions({
  name: "ProjectExperience",
});
const store = useEducationalBackgroundStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
