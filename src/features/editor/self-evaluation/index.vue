<template>
  <div class="flex flex-col sm:flex-row max-w-[75rem] mx-auto">
    <RichTextEditor
      class="h-80 flex-1"
      :placeholder="placeholder"
      v-model="store.editorContent"
      @ready="(quill) => (quillRef = quill)"
    />
    <div class="sm:w-32 sm:text-center">
      <el-button class="mt-2" type="primary" round @click="addCivilities"
        >客套话</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { ElButton, ElMessageBox } from "element-plus";
import { Delta } from "@vueup/vue-quill";
import { RichTextEditor } from "@/components";
import { isEmptyDelta } from "@/utils";
import { useSelfEvaluationStore } from "@/stores";
import { placeholder, civilities } from ".";
defineOptions({
  name: "SelfEvaluation",
});
const store = useSelfEvaluationStore();

/*
 * 添加 “客套话” 到 editor 中的逻辑
 */

const quillRef = ref<{
  blur: () => void;
  getLength: () => number;
  setSelection: (a: number) => void;
} | null>(null);
/**
 * 修改 quill 后，光标位置并没有位于文本最后，而是位于文本开始，
 *  该函数的作用就是调整光标位置到正确的地方
 */
function adjustCursor() {
  const quill = quillRef.value;
  if (quill == null) return; //正常情况下，quill是必定存在的
  quill.blur();
  nextTick(() => {
    quill.setSelection(quill.getLength());
  });
}
function addCivilities() {
  if (isEmptyDelta(store.editorContent)) {
    store.editorContent = new Delta().insert(civilities);
    adjustCursor();
    return;
  }
  ElMessageBox.confirm(
    "富文本编辑框中已存在输入，该操纵会覆盖已存在的输入，请问是否覆盖？",
    "温馨提醒",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      lockScroll: false, //避免锁定滚动条，因为锁定滚动条会导致布局发生变化，性能与体验都不好
    },
  )
    .then(() => {
      store.editorContent = new Delta().insert(civilities);
      adjustCursor();
    })
    .catch(() => {}); //避免用户按下取消按钮时，报未捕获的错误信息
}
</script>
