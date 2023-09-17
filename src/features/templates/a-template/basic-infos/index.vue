<template>
  <section>
    <img src="" alt="照片" />
    <div>
      <h1>{{ store.name }}</h1>
      <div class="grid grid-cols-2">
        <div v-for="(value, key) of infos" :key="key">
          <span :class="`iconfont icon-${iconMap[key]}`" /><span>{{ key }}</span
          >:<span>{{ value }}</span>
        </div>
        <div v-for="(value, key) of store.additionalInfos" :key="key">
          <span :class="`iconfont icon-${customIcon}`" /><span>{{ key }}</span
          >:<span>{{ value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { omit } from "lodash";
import { iconMap, customIcon } from ".";
import type { IconMap } from ".";
import { useBasicInfosStore } from "@/stores/basic-infos";
defineOptions({
  name: "basicInfos",
});
const store = useBasicInfosStore();

const heightOrWidth = computed(() => {
  return store.height + "/" + store.weight;
});
const infos = computed<IconMap>(() => {
  return {
    heightOrWidth: heightOrWidth.value,
    ...omit(store, [
      "name",
      "picture",
      "weight",
      "height",
      "showPhoto",
      "convertToAge",
      "additionalInfos",
    ]),
  };
});
</script>
<style></style>
@/stores/basic-infos
