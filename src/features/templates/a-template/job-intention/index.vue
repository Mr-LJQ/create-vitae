<template>
  <Section>
    <Separation>{{ moduleName }}</Separation>
    <div v-for="{ id, pay, city, hiredate, post } of jobIntentions" :key="id">
      <ul>
        <li>求职意向：{{ post }}</li>
        <li>{{ city }}</li>
        <li>{{ pay }}</li>
        <li>{{ hiredate }}</li>
      </ul>
    </div>
  </Section>
</template>
<script lang="ts" setup>
import Separation from "../separation/index.vue";
import { propsType } from ".";
defineOptions({
  name: "JobIntention",
});
defineProps(propsType);
</script>
<style></style>
