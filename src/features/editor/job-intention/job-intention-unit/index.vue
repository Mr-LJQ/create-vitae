<template>
  <ul
    class="w-full box-content only:translate-x-6 transition-transform duration-300"
    :class="GRID_AUTO_CENTER"
  >
    <EditInputItem
      v-slot="{ id }"
      draggable="true"
      label-text="求职意向"
      @dragstart.prevent.stop
    >
      <input
        :id="id"
        type="text"
        :class="EDIT_INPUT_ITEM_INPUT"
        placeholder="请输入意向职业"
        v-model="post"
      />
    </EditInputItem>
    <EditInputItem
      draggable="true"
      @dragstart.prevent.stop
      ref="cityContainerRef"
      @click="focusCascader"
      v-slot="{ id }"
      label-text="意向城市"
    >
      <el-cascader
        :id="id"
        filterable
        :show-all-levels="false"
        :props="{ expandTrigger: 'hover', emitPath: false }"
        v-model="city"
        placeholder="请输入意向城市"
        :options="chinaCities"
      />
    </EditInputItem>
    <EditInputItem
      draggable="true"
      @dragstart.prevent.stop
      v-slot="{ id }"
      label-text="期望薪资"
    >
      <input
        :id="id"
        type="text"
        :class="EDIT_INPUT_ITEM_INPUT"
        placeholder="请输入期望薪资"
        v-model="pay"
      />
    </EditInputItem>
    <EditInputItem
      draggable="true"
      @dragstart.prevent.stop
      v-slot="{ id }"
      label-text="入职时间"
    >
      <el-select :id="id" v-model="hiredate" fit-input-width placeholder="不填">
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
import { computed, ref } from "vue";
import { ElSelect, ElOption, ElCascader } from "element-plus";
import { EditInputItem } from "@/components";
import { dom } from "@/utils";
import { chinaCities } from "./china-cities";
import { EDIT_INPUT_ITEM_INPUT, GRID_AUTO_CENTER } from "@/styles";
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
  "",
  "随时到岗",
  "一周内到岗",
  "一月内到岗",
  "到岗时间另行商议",
];

/**
 * 因为 ElCascader 无法与 Label 通过 for id 联动，
 *  为了效果的统一，这里手动模拟该效果
 */
const cityContainerRef = ref<HTMLElement | null>(null);
function focusCascader() {
  const liElement = dom(cityContainerRef);
  if (!liElement) return;
  (liElement.querySelector(".el-cascader") as HTMLElement | null)?.click();
}
</script>
