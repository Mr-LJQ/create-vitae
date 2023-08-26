<template>
  <TagModule
    v-model:custom="custom"
    v-model:content="store.content"
    :placeholder="placeholder"
    :module-name="moduleName"
    :presetTags="presetTags"
    @handle_add_custom="handleAddCustom"
    @handle_toggle_tag="handleToggleTag"
  />
  <ul>
    <li :key="tag" v-for="tag of store.tags">
      <p></p>
      <div>
        <el-select>
          <el-option
            v-for="item of proficiency"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
        <el-select>
          <el-option
            v-for="item of presentation"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
        <el-icon @click="deleteTag(tag)"><Minus /></el-icon>
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElSelect, ElOption, ElIcon } from "element-plus";
import { Minus } from "@element-plus/icons-vue";
import TagModule from "@/components/share-modules/TagModule.vue";
import { useSpecialtyStore } from "@/stores/specialty";
import {
  useHandleAddCustom,
  useHandleToggleTag,
} from "@/hooks/use-tag-handler";
import {
  placeholder,
  propsType,
  presetTags,
  presentation,
  proficiency,
} from ".";
defineProps(propsType);
defineOptions({
  name: "specialty",
});

const store = useSpecialtyStore();
const { addNewTag, deleteTag, hasTag } = store;
const custom = ref("");
const handleAddCustom = useHandleAddCustom(custom, {
  hasTag,
  addNewTag,
});
const handleToggleTag = useHandleToggleTag({ addNewTag, deleteTag, hasTag });
</script>
