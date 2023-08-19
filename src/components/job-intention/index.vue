<template>
  <ul>
    <li :class="$style.a" v-for="(item, index) of jobIntentions" :key="Object.values(item).join()">
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
  <AddButton @click="addItem">求职意向</AddButton>
</template>
<script lang="ts" setup>
import { ElButton } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import AddButton from "@/components/add-button/index.vue";
import { useJobIntentionStore } from "@/stores/job-intention";
import JobIntentionUnit from "./job-intention-unit/index.vue";
defineOptions({
  name: "JobIntention",
});
const { jobIntentions, appendJobIntention, deleteJobIntention } =
  useJobIntentionStore();
function addItem() {
  appendJobIntention({
    pay: "",
    city: "",
    post: "",
    hiredate: "",
  });
}
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
