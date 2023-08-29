<template>
  <ul>
    <li :key="item.id" v-for="(item, index) of store.experiences">
      <MoveModule
        :firstItem="firstItem"
        :secondItem="secondItem"
        :thirdItem="thirdItem"
        :placeholder="placeholder"
        v-model:content="item.editorContent"
        v-model:firstInput="item.first"
        v-model:secondInput="item.second"
        v-model:startTime="item.startTime"
        v-model:finishTime="item.finishTime"
        v-model:isHitherto="item.isHitherto"
        :showDeleteButton="isMultiple"
        :showMoveDownButton="isShowMoveDownButton(index)"
        :showMoveUpButton="isShowMoveUpButton(index)"
        @handle_delete="deleteItem(index)"
        @handle_move_up="moveUpItem(index)"
        @handle_move_down="moveDownItem(index)"
      >
        <EditInputItem
          label-text="学历"
          v-slot="{ id }"
        >
          <el-select :id="id" v-model="item.degree">
            <el-option
              v-for="item of degrees"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select> </EditInputItem
      ></MoveModule>
    </li>
  </ul>
  <AddButton @click="addNewItem">{{ moduleName }}</AddButton>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ElSelect, ElOption } from "element-plus";
import MoveModule from "@/components/share-modules/move-module/index.vue";
import { useEducationalBackgroundStore } from "@/stores/educational-background";
import AddButton from "@/components/buttons/AddButton.vue";
import EditInputItem from "@/components/edit-input-item/index.vue";
import {
  firstItem,
  secondItem,
  thirdItem,
  placeholder,
  propsType,
  degrees,
} from ".";
defineProps(propsType);
defineOptions({
  name: "ProjectExperience",
});
const store = useEducationalBackgroundStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;

const isMultiple = computed(() => {
  return store.experiences.length > 1;
});
function isShowMoveUpButton(index: number) {
  return index > 0;
}
function isShowMoveDownButton(index: number) {
  return index < store.experiences.length - 1;
}
</script>
