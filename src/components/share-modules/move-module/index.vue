<template>
  <section :class="$style.a">
    <div :class="$style.b">
      <ul :class="AUTO_WRAP">
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
        <EditInputItem
          :class="OVERRIDE_EL_INPUT_CLASS"
          :label-text="thirdItem.label"
          v-slot="{ id }"
        >
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
import {
  AUTO_WRAP,
  BUTTON_MOVE_CLASS,
  BUTTON_DELETE_CLASS,
  OVERRIDE_EL_INPUT_CLASS,
} from "@/styles";
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

const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "EducationalBackgroundUnit",
});

const content = computed({
  get() {
    return props.content;
  },
  set(value: string) {
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

function handleDelete() {
  ElMessageBox.confirm("删除后无法恢复，确定删除该教育背景吗?", "温馨提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    emit(HANDLE_DELETE);
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
