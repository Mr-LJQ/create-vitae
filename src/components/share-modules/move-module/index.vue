<template>
  <section class="flex flex-row relative">
    <div
      class="flex-1"
      :class="$style.transition"
      :style="{ maxWidth: showDeleteButton ? 'calc(100% - 128px)' : '100%' }"
    >
      <ul :class="GRID_AUTO_CENTER">
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
            style="
              --el-date-editor-width: 220px;
              --el-input-bg-color: #f3f4f6;
              --el-input-border-color: #f3f4f6;
              box-sizing: border-box;
            "
            :default-value="defaultTimeValue"
            unlink-panels
            v-model="timeRange"
            type="monthrange"
            range-separator="-"
            :start-placeholder="thirdItem.placeholder"
            :end-placeholder="thirdItem.placeholder2"
            clearable
          />
          <el-checkbox label="至今" v-model="isHitherto" />
        </EditInputItem>
        <slot />
      </ul>
      <RichTextEditor
        class="max-h-56"
        :placeholder="placeholder"
        v-model="content"
      />
    </div>
    <Transition :name="TRANSITION_BUTTONS_SLIDE">
      <div class="w-32 text-center right" v-if="showDeleteButton">
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
import { computed, watchEffect } from "vue";
import EditInput from "@/components/edit-input/index.vue";
import EditInputItem from "@/components/edit-input-item/index.vue";
import { ElCheckbox, ElMessageBox, ElDatePicker } from "element-plus";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import OperateButton from "@/components/buttons/OperateButton.vue";
import {
  GRID_AUTO_CENTER,
  BUTTON_MOVE_CLASS,
  BUTTON_DELETE_CLASS,
  TRANSITION_BUTTONS_SLIDE,
} from "@/styles";
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
  name: "EducationalBackgroundUnit",
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
</script>
<style module>
.transition {
  transition: all 0.5s ease;
}
</style>
