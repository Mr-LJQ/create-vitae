<template>
  <section :class="$style.a">
    <div :class="$style.b">
      <ul :class="AUTO_WRAP">
        <EditInputItem label-text="学校名称" v-slot="{ id }">
          <EditInput
            :id="id"
            v-model="schoolName"
            placeholder="请输入学校名称"
          />
        </EditInputItem>
        <EditInputItem label-text="所学专业" v-slot="{ id }">
          <EditInput :id="id" v-model="major" placeholder="请输入所学专业" />
        </EditInputItem>
        <EditInputItem
          :class="OVERRIDE_EL_INPUT_CLASS"
          label-text="就读时间"
          v-slot="{ id }"
        >
          <el-date-picker
            :id="id"
            type="month"
            v-model="startSchool"
            placeholder="入学年月"
            clearable
          />-
          <el-date-picker
            type="month"
            v-model="finishSchool"
            placeholder="毕业年月"
            clearable
          />
          <el-checkbox label="至今" v-model="isHitherto" />
        </EditInputItem>
        <EditInputItem
          label-text="学历"
          v-slot="{ id }"
        >
          <el-select :id="id" v-model="degree">
            <el-option
              v-for="item of degrees"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </EditInputItem>
      </ul>
      <RichTextEditor
        placeholder="所修课程、成绩排名、在校的职务、参赛获奖情况等有利于突出个人优势的信息。尽量简洁，突出重点。"
      />
    </div>
    <div v-if="showDeleteButton">
      <OperateButton
        v-if="showMoveUpButton"
        :class="BUTTON_MOVE_CLASS"
        @click="$emit(MOVE_UP_EVENT_NAME)"
        >上移</OperateButton
      >
      <OperateButton
        v-if="showMoveDownButton"
        :class="BUTTON_MOVE_CLASS"
        @click="$emit(MOVE_DOWN_EVENT_NAME)"
        >下移</OperateButton
      >
      <OperateButton :class="BUTTON_DELETE_CLASS" @click="handleDelete"
        >删除</OperateButton
      >
    </div>
  </section>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import EditInput from "@/components/edit-input/EditInput.vue";
import EditInputItem from "@/components/edit-input-item/EditInputItem.vue";
import {
  ElSelect,
  ElOption,
  ElCheckbox,
  ElMessageBox,
  ElDatePicker,
} from "element-plus";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import OperateButton from "@/components/buttons/OperateButton.vue";
import {
  AUTO_WRAP,
  BUTTON_MOVE_CLASS,
  BUTTON_DELETE_CLASS,
} from "@/styles";
import {
  degrees,
  propsType,
  emitsType,
  MAJOR_EVENT_NAME,
  DEGREE_EVENT_NAME,
  IS_HITHERTO_EVENT_NAME,
  SCHOOL_NAME_EVENT_NAME,
  START_SCHOOL_EVENT_NAME,
  FINISH_SCHOOL_EVENT_NAME,
  DELETE_EVENT_NAME,
  MOVE_UP_EVENT_NAME,
  MOVE_DOWN_EVENT_NAME,
} from ".";

const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "EducationalBackgroundUnit",
});

const major = computed({
  get() {
    return props.major;
  },
  set(value) {
    emit(MAJOR_EVENT_NAME, value);
  },
});
const degree = computed({
  get() {
    return props.degree;
  },
  set(value) {
    emit(DEGREE_EVENT_NAME, value);
  },
});
const isHitherto = computed({
  get() {
    return props.isHitherto;
  },
  set(value) {
    emit(IS_HITHERTO_EVENT_NAME, value);
  },
});
const schoolName = computed({
  get() {
    return props.schoolName;
  },
  set(value) {
    emit(SCHOOL_NAME_EVENT_NAME, value);
  },
});
const startSchool = computed({
  get() {
    return props.startSchool;
  },
  set(value) {
    emit(START_SCHOOL_EVENT_NAME, value);
  },
});
const finishSchool = computed({
  get() {
    return props.finishSchool;
  },
  set(value) {
    emit(FINISH_SCHOOL_EVENT_NAME, value);
  },
});

function handleDelete() {
  ElMessageBox.confirm("删除后无法恢复，确定删除该教育背景吗?", "温馨提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    emit(DELETE_EVENT_NAME);
  });
}
</script>
<style module>
.a {
  display: flex;
  flex-direction: row;
}
.b {
  flex: 1;
}
</style>
