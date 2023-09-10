<template>
  <ul class="w-full" :class="GRID_AUTO_CENTER">
    <EditInputItem for-id="post" label-text="求职意向">
      <input
        id="post"
        type="text"
        :class="EDIT_INPUT_ITEM_INPUT"
        placeholder="请输入意向职业"
        v-model="post"
      />
    </EditInputItem>
    <EditInputItem ref="cityLi" for-id="city" label-text="意向城市">
      <el-cascader
        filterable
        :show-all-levels="false"
        :props="{ expandTrigger: 'hover', emitPath: false }"
        v-model="city"
        placeholder="请输入意向城市"
        :options="chinaCities"
      />
    </EditInputItem>
    <EditInputItem for-id="pay" label-text="期望薪资">
      <input
        id="pay"
        type="text"
        :class="EDIT_INPUT_ITEM_INPUT"
        placeholder="请输入期望薪资"
        v-model="pay"
      />
    </EditInputItem>
    <EditInputItem for-id="hiredate" label-text="入职时间">
      <el-select id="hiredate" v-model="hiredate" fit-input-width>
        <el-option
          v-for="value of hiredates"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
    </EditInputItem>
  </ul>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ElSelect, ElOption, ElCascader } from "element-plus";
import EditInputItem from "@/components/edit-input-item/index.vue";
import { EDIT_INPUT_ITEM_INPUT, GRID_AUTO_CENTER } from "@/styles";
import { chinaCities } from "./china-cities";
import {
  unitProps,
  unitEmits,
  UPDATE_PAY,
  UPDATE_POST,
  UPDATE_CITY,
  UPDATE_HIREDATE,
} from ".";
const props = defineProps(unitProps);
const emit = defineEmits(unitEmits);
defineOptions({
  name: "JobIntentionUnit",
});
/*
 * 提供 v-model 支持
 */
const post = computed({
  get() {
    return props.post;
  },
  set(value: string) {
    emit(UPDATE_POST, value);
  },
});

const city = computed({
  get() {
    return props.city;
  },
  set(value: string) {
    emit(UPDATE_CITY, value);
  },
});

const pay = computed({
  get() {
    return props.pay;
  },
  set(value: string) {
    emit(UPDATE_PAY, value);
  },
});

const hiredate = computed({
  get() {
    return props.hiredate;
  },
  set(value: string) {
    emit(UPDATE_HIREDATE, value);
  },
});

const hiredates = [
  "不填",
  "随时到岗",
  "一周内到岗",
  "一月内到岗",
  "到岗时间另行商议",
];
</script>
