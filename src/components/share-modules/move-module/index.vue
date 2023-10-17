<template>
  <section class="flex flex-col sm:flex-row">
    <div class="flex-1 transition-all duration-500">
      <ul class="flex flex-wrap justify-between">
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
        <slot />
        <EditInputItem
          @click="focusDatePicker"
          :label-text="thirdItem.label"
          v-slot="{ id }"
        >
          <el-date-picker
            :id="id"
            ref="datePickerRef"
            style="--el-date-editor-width: 220px"
            :default-value="defaultTimeValue"
            unlink-panels
            v-model="timeRange"
            type="monthrange"
            range-separator="-"
            :start-placeholder="thirdItem.placeholder"
            :end-placeholder="thirdItem.placeholder2"
            :editable="false"
          />
          <el-checkbox label="至今" v-model="isHitherto" />
        </EditInputItem>
      </ul>
      <RichTextEditor
        class="max-h-56"
        :placeholder="placeholder"
        v-model="content"
      />
    </div>
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="max-sm:translate-y-5 opacity-0 sm:translate-x-32"
      enter-to-class="max-sm:translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="max-sm:translate-y-0 opacity-100 sm:translate-x-0"
      leave-to-class="max-sm:translate-y-5 opacity-0 sm:translate-x-32"
    >
      <div
        class="flex max-sm:justify-center flex-wrap sm:flex-col sm:w-32 items-end"
        v-if="showDeleteButton"
      >
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
    </Transition>
  </section>
</template>
<script lang="ts" setup>
import { computed, watchEffect, ref, type ComponentPublicInstance } from "vue";
import { ElCheckbox, ElMessageBox, ElDatePicker } from "element-plus";
import {
  OperateButton,
  RichTextEditor,
  EditInputItem,
  EditInput,
} from "@/components";
import { BUTTON_MOVE_CLASS, BUTTON_DELETE_CLASS } from "@/styles";
import {
  propsType,
  emitsType,
  UPDATE_CONTENT,
  UPDATE_SECOND_INPUT,
  UPDATE_FIRST_INPUT,
  UPDATE_IS_HITHERTO,
  UPDATE_TIME_RANGE,
  HANDLE_DELETE,
  HANDLE_MOVE_UP,
  HANDLE_MOVE_DOWN,
} from ".";
import type { Delta } from "@vueup/vue-quill";

const props = defineProps(propsType);
const emit = defineEmits(emitsType);
defineOptions({
  name: "MoveModule",
});

/*
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
const timeRange = computed({
  get() {
    /**
     * 注意，此处的 ! 是为了避免一个类型错误，原因是因为 ElDatePicker 的 v-model 不支持 null类型，
     *  但实际上，当使用 clearable 功能使，其返回的值就是一个 null 类型，
     *    因此这应当算是一个 ElDatePicker 的类型BUG.
     */
    return props.timeRange!;
  },
  set(value) {
    emit(UPDATE_TIME_RANGE, value);
  },
});

/*
 * 删除按钮相关逻辑
 */
function handleDelete() {
  ElMessageBox.confirm("删除后无法恢复，确定删除该教育背景吗?", "温馨提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false, //避免锁定滚动条，因为锁定滚动条会导致布局发生变化，性能与体验都不好
  })
    .then(() => {
      emit(HANDLE_DELETE);
    })
    .catch(() => {}); //避免用户按下取消按钮时，报未捕获的错误信息
}

/*
 * 实现 至今按钮 与 日期选择器 间的联动
 */
watchEffect(() => {
  if (isHitherto.value && timeRange.value !== null) {
    timeRange.value[1] = new Date();
  }
});

/**
 * 因为 ElDatePicker 的 type="monthrange" 无法与 Label 通过 for id 联动，
 *  为了效果的统一，这里手动模拟该效果
 */
const datePickerRef = ref<ComponentPublicInstance<{
  focus: () => void;
}> | null>(null);
function focusDatePicker() {
  if (!datePickerRef.value) return;
  datePickerRef.value.focus();
}
</script>
