<template>
  <section class="flex flex-row">
    <div class="flex-1">
      <ul class="flex flex-wrap justify-around">
        <EditInputItem :label-text="firstItem.label" v-slot="{ id }">
          <EditInput
            :id="id"
            v-model="firstValue"
            :placeholder="firstItem.placeholder"
          />
        </EditInputItem>
        <EditInputItem :label-text="secondItem.label" v-slot="{ id }">
          <EditInput
            :id="id"
            v-model="secondValue"
            :placeholder="secondItem.placeholder"
          />
        </EditInputItem>
        <EditInputItem :label-text="thirdItem.label" v-slot="{ id }">
          <el-date-picker
            :id="id"
            type="month"
            v-model="begin"
            :placeholder="thirdItem.placeholder"
            clearable
          />-
          <el-date-picker
            type="month"
            v-model="finish"
            :placeholder="thirdItem.placeholder2"
            clearable
          />
          <el-checkbox label="至今" v-model="isHitherto" />
        </EditInputItem>
        <slot />
      </ul>
      <RichTextEditor :placeholder="placeholder" v-model="content" />
    </div>
    <div v-if="showDeleteButton">
      <OperateButton
        v-if="showMoveUpButton"
        :class="BUTTON_MOVE_CLASS"
        @click="$emit(HANDLE_MOVE_UP)"
        >上移</OperateButton
      >
      <OperateButton
        v-if="showMoveDownButton"
        :class="BUTTON_MOVE_CLASS"
        @click="$emit(HANDLE_MOVE_DOWN)"
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
import EditInput from "@/components/edit-input/index.vue";
import EditInputItem from "@/components/edit-input-item/index.vue";
import { ElCheckbox, ElMessageBox, ElDatePicker } from "element-plus";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import OperateButton from "@/components/buttons/OperateButton.vue";
import { BUTTON_MOVE_CLASS, BUTTON_DELETE_CLASS } from "@/styles";
import {
  propsType,
  emitsType,
  UPDATE_CONTENT,
  UPDATE_SECOND_INPUT,
  UPDATE_FINISH_TIME,
  UPDATE_FIRST_INPUT,
  UPDATE_IS_HITHERTO,
  UPDATE_START_TIME,
  HANDLE_DELETE,
  HANDLE_MOVE_UP,
  HANDLE_MOVE_DOWN,
} from ".";
import type { Delta } from "@vueup/vue-quill";

const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "EducationalBackgroundUnit",
});

/**
 * 处理 v-model 语法糖
 */
const content = computed({
  get() {
    return props.content;
  },
  set(value: Delta) {
    emit(UPDATE_CONTENT, value);
  },
});
const firstValue = computed({
  get() {
    return props.firstInput;
  },
  set(value) {
    emit(UPDATE_FIRST_INPUT, value);
  },
});
const secondValue = computed({
  get() {
    return props.secondInput;
  },
  set(value) {
    emit(UPDATE_SECOND_INPUT, value);
  },
});
const isHitherto = computed({
  get() {
    return props.isHitherto;
  },
  set(value) {
    emit(UPDATE_IS_HITHERTO, value);
  },
});
const begin = computed({
  get() {
    return props.startTime;
  },
  set(value) {
    emit(UPDATE_START_TIME, value);
  },
});
const finish = computed({
  get() {
    return props.finishTime;
  },
  set(value) {
    emit(UPDATE_FINISH_TIME, value);
  },
});

/**
 * 删除按钮相关逻辑
 */
function handleDelete() {
  ElMessageBox.confirm("删除后无法恢复，确定删除该教育背景吗?", "温馨提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      emit(HANDLE_DELETE);
    })
    .catch(() => {}); //避免用户按下取消按钮时，报未捕获的错误信息
}
</script>
