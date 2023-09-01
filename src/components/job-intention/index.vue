<template>
  <ul>
    <li :class="$style.a" v-for="(item, index) of jobIntentions" :key="item.id">
      <JobIntentionUnit
        v-model:pay="item.pay"
        v-model:city="item.city"
        v-model:post="item.post"
        v-model:hiredate="item.hiredate"
      />
      <el-button
        circle
        type="danger"
        :icon="Delete"
        :class="$style.b"
        v-if="index !== 0"
        @click="deleteJobIntention(index)"
      />
    </li>
  </ul>
  <AddButton @click="appendJobIntention">求职意向</AddButton>
</template>
<script lang="ts" setup>
import { ElButton } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import AddButton from "@/components/buttons/AddButton.vue";
import { useJobIntentionStore } from "@/stores/job-intention";
import JobIntentionUnit from "./job-intention-unit/index.vue";
import { propsType } from ".";
defineProps(propsType);
defineOptions({
  name: "JobIntention",
});
const { jobIntentions, appendJobIntention, deleteJobIntention } =
  useJobIntentionStore();
</script>
<style module>
.a {
  position: relative;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.b {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
