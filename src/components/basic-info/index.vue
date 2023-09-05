<template>
  <div class="max-w-[1200px] mx-auto">
    <ul class="flex flex-wrap justify-between" :class="BORDER_B_DASHED">
      <EditInputItem v-slot="{ id }" label-text="您的姓名">
        <EditInput :id="id" placeholder="请输入您的姓名" v-model="store.name" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="出生年月">
        <el-date-picker
          :id="id"
          type="month"
          placeholder="选择年月"
          v-model="store.birth"
        />
        <el-checkbox
          v-if="store.birth"
          v-model="store.convertToAge"
          label="转年龄"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系电话">
        <EditInput :id="id" placeholder="输入联系电话" v-model="store.phone" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系邮箱">
        <EditInput :id="id" placeholder="输入联系邮箱" v-model="store.email" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="工作年限">
        <el-select :id="id" v-model="store.yearsOfWorking">
          <el-option
            v-for="value in yearsOfWorkingOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="照片设置">
        <FileButton />
        <el-checkbox :id="id" v-model="store.showPhoto" label="展示照片" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="性别">
        <el-select :id="id" v-model="store.gender">
          <el-option
            v-for="value in genderOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="婚姻状况">
        <el-select :id="id" v-model="store.maritalStatus">
          <el-option
            v-for="value of maritalStatusOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="身高/体重">
        <EditInput
          :id="id"
          style="width: 60px"
          placeholder="身高"
          v-model="store.height"
        />cm
        <EditInput
          class="ml-4"
          placeholder="体重"
          style="width: 60px"
          v-model="store.weight"
        />kg
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="民族">
        <EditInput :id="id" placeholder="请输入民族" v-model="store.nation" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="籍贯">
        <EditInput
          :id="id"
          placeholder="请输入籍贯"
          v-model="store.nativePlace"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="政治面貌">
        <el-select :id="id" v-model="store.politicsStatus">
          <el-option
            v-for="value of politicsStatusOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </el-select>
      </EditInputItem>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ElSelect, ElDatePicker, ElOption, ElCheckbox } from "element-plus";
import { useBasicInfoStore } from "@/stores/basic-info";
import EditInputItem from "@/components/edit-input-item/index.vue";
import EditInput from "@/components/edit-input/index.vue";
import FileButton from "@/components/buttons/FileButton.vue";
import { BORDER_B_DASHED } from "@/styles";
import {
  propsType,
  genderOptions,
  maritalStatusOptions,
  politicsStatusOptions,
  yearsOfWorkingOptions,
} from ".";
defineOptions({
  name: "BasicInfo",
});
defineProps(propsType);
const store = useBasicInfoStore();
</script>
