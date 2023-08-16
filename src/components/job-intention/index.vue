<template>
  <ul>
    <li>
      <div>
        <label>求职意向</label>
        <input type="text" placeholder="请输入意向职业" />
      </div>
      <div>
        <label>意向城市</label>
        <input type="text" />
        <el-cascader-panel :options="provinceAndCityData" />
      </div>
      <div>
        <label>期望薪资</label>
        <input type="text" />
      </div>
      <div>
        <label for="">入职时间</label>
        <el-select>
          <el-option
            v-for="value of hiredates"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useJobIntentionStore } from "@/stores/job-intention";
import { provinceAndCityData } from "element-china-area-data";
//import EditItem from '@/components/edit-item/index.vue'
import { ElSelect, ElOption, ElCascaderPanel } from "element-plus";

import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/cascader-panel/style/css";

const hiredates = [
  "不填",
  "随时到岗",
  "一周内到岗",
  "一月内到岗",
  "到岗时间另行商议",
];

const jobIntentions = useJobIntentionStore()
</script>
<style></style>
