<template>
  <AModule
    :firstItem="firstItem"
    :secondItem="secondItem"
    :thirdItem="thirdItem"
    :placeholder="placeholder"
    :dataList="store.dataList"
    :deleteItem="deleteItem"
    :addNewItem="addNewItem"
    :moveUpItem="moveUpItem"
    :moveDownItem="moveDownItem"
    :moduleName="moduleName"
    v-slot="{ index }"
  >
    <EditInputItem label-text="学历" v-slot="{ id }">
      <el-select :id="id" v-model="store.dataList[index].third">
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
import EditInputItem from "@/components/edit-input-item/index.vue";
import AModule from "@/components/share-modules/a-module/index.vue";
import { useEducationalBackgroundStore } from "@/stores/educational-background";
import {
  firstItem,
  secondItem,
  thirdItem,
  placeholder,
  propsType,
  degrees,
} from ".";
defineProps(propsType);
defineOptions({
  name: "ProjectExperience",
});
const store = useEducationalBackgroundStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;
</script>
