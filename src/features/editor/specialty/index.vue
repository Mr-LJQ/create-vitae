<template>
  <TagModule
    v-model:content="store.content"
    :placeholder="placeholder"
    :module-name="moduleName"
    :presetTags="presetTags"
    :add-tag="addTag"
    :has-tag="hasTag"
    :delete-tag="deleteTag"
  >
    <ul class="flex flex-wrap my-3">
      <li :key="tag" v-for="[tag, options] of store.tags">
        <span class="text-xs">{{ tag }}</span>
        <div class="mr-2">
          <el-select
            class="proficiency mr-2"
            v-model="options.proficiency"
            fit-input-width
          >
            <el-option
              v-for="item of proficiency"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select>
          <el-select
            class="presentation mr-2"
            v-model="options.presentation"
            fit-input-width
          >
            <el-option
              v-for="item of presentation"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select>
          <el-button
            circle
            size="small"
            type="danger"
            :icon="Delete"
            @click="deleteTag(tag)"
          />
        </div>
      </li>
    </ul>
  </TagModule>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption, ElButton } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { TagModule } from "@/components";
import { useSpecialtyStore } from "@/stores";
import {
  placeholder,
  propsType,
  presetTags,
  presentation,
  proficiency,
} from ".";
defineProps(propsType);
defineOptions({
  name: "SpecialSkill",
});

const store = useSpecialtyStore();
const { addTag, deleteTag, hasTag } = store;
</script>
<style scoped>
.proficiency :deep(.el-input) {
  --el-input-bg-color: #fff;
  --el-input-border-color: #eee;
  --el-input-width: 5rem;
}
.presentation :deep(.el-input) {
  --el-input-bg-color: #fff;
  --el-input-border-color: #eee;
  --el-input-width: 6.25rem;
}
</style>
