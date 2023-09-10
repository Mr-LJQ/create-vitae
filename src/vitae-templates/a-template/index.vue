<template>
  <div>
    <section>
      <img src="" alt="照片" />
      <div>
        <h1>{{ basicInfos.name }}</h1>
        <div class="grid grid-cols-2">
          <div v-for="(value, key) of infos" :key="key">
            <span :class="`iconfont icon-${iconMap[key]}`" /><span>{{
              key
            }}</span
            >:<span>{{ value }}</span>
          </div>
          <div v-for="(value, key) of basicInfos.additionalInfos" :key="key">
            <span :class="`iconfont icon-${customIcon}`" /><span>{{ key }}</span
            >:<span>{{ value }}</span>
          </div>
        </div>
      </div>
    </section>
    <section>
      <Separation>
         </Separation>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { omit } from "lodash";
import { propsType, iconMap, customIcon } from ".";
import type { IconMap } from ".";
import Separation from "./separation/index.vue";
defineOptions({
  name: "ATemplate",
});

const props = defineProps(propsType);
const { basicInfos } = toRefs(props);

const heightOrWidth = computed(() => {
  return basicInfos.value.height + "/" + basicInfos.value.weight;
});
const infos = computed<IconMap>(() => {
  return {
    heightOrWidth: heightOrWidth.value,
    ...omit(basicInfos.value, [
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
