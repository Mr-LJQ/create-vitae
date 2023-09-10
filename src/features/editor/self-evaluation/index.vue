<template>
  <div class="flex max-w-[1200px] mx-auto">
    <RichTextEditor
      class="h-80 flex-1"
      :placeholder="placeholder"
      v-model="store.editorContent"
      @ready="(quill) => (quillRef = quill)"
    />
    <div class="w-32 text-center">
      <el-button class="mt-2" type="primary" round @click="addCivilities"
        >客套话</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { isEqual } from "lodash";
import { ElButton, ElMessageBox } from "element-plus";
import { Delta, Quill } from "@vueup/vue-quill";
import RichTextEditor from "@/components/rich-text-editor/index.vue";
import { placeholder, civilities } from ".";
import { useSelfEvaluationStore } from "@/stores/self-evaluation";
defineOptions({
  name: "SelfEvaluation",
});
const store = useSelfEvaluationStore();

/*
 * 添加 “客套话” 到 editor 中的逻辑
 */

const quillRef = ref<Quill | null>(null);
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
  const length = store.editorContent.length();
  if (
    //该情况是，用户从未进行输入
    length === 0 ||
    //该情况是，用户曾经进行过输入，但是后面全部删除了
    (length === 1 && isEqual(store.editorContent.ops, [{ insert: "\n" }]))
  ) {
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
    }
  )
    .then(() => {
      store.editorContent = new Delta().insert(civilities);
      adjustCursor();
    })
    .catch(() => {}); //避免用户按下取消按钮时，报未捕获的错误信息
}
</script>
