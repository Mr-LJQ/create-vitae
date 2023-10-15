<template>
  <section>
    <Separation>{{ moduleName }}</Separation>
    <ul
      :key="id"
      class="flex justify-between text-center whitespace-nowrap"
      v-for="{ id, pay, city, hiredate, post } of store.jobIntentions"
    >
      <li class="flex-1 text-left font-bold">
        {{ post && `求职意向：${post}` }}
      </li>
      <li class="flex-1">{{ city }}</li>
      <li class="flex-1">{{ pay }}</li>
      <li class="flex-1 text-end">{{ hiredate }}</li>
    </ul>
  </section>
</template>
<script lang="ts" setup>
import { useJobIntentionStore } from "@/stores/job-intention";
import Separation from "../../components/separation/index.vue";
import { propsType } from ".";
defineOptions({
  name: "JobIntention",
});
defineProps(propsType);
const store = useJobIntentionStore();
</script>
