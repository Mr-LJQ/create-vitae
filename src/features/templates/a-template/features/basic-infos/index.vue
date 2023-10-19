<template>
  <section class="flex">
    <div class="w-32 shrink-0" v-if="store.showPhoto">
      <img :src="store.pictureUrl" alt="照片" />
    </div>
    <div>
      <dl class="pl-8 whitespace-nowrap">
        <dt>
          <strong class="text-2xl">{{ store.name }}</strong>
        </dt>
        <dd :key="key" :class="$style.dd" v-for="[key, name, value] of infos">
          <span
            :class="[
              `mr-3 align-top icon-font-template-a icon-template-a-${iconMap[key]}`,
            ]"
          /><span :class="$style.name">{{ name }}</span
          >：{{ value }}
        </dd>
        <dd
          :key="key"
          :class="$style.dd"
          v-for="(value, key) of store.additionalInfos"
        >
          <span
            :class="[`mr-3 icon-font-template-a icon-template-a-${customIcon}`]"
          /><span :class="$style.name">{{ key }}</span
          >：{{ value.trim() }}
        </dd>
      </dl>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { omit } from "lodash";
import { iconMap, customIcon, nameMap, order } from ".";
import type { KeysType } from ".";
import { useBasicInfosStore } from "@/stores/basic-infos";
defineOptions({
  name: "BasicInfos",
});
const store = useBasicInfosStore();

/**
 * 处理身高与体重
 */
const heightWeight = computed(() => {
  let value = "";
  let name = "";
  let { height, weight } = store;
  height = height.trim();
  weight = weight.trim();
  if (height && weight) {
    name = "身高体重";
    value = height + "cm/" + weight + "kg";
  } else if (height) {
    name = "身高";
    value = height + "cm";
  } else if (weight) {
    name = "体重";
    value = weight + "kg";
  }
  return [name, value];
});

/**
 * 将 object 装换为 entries 格式并排序，以使其按顺序显示
 */
const infos = computed(() => {
  const items = {
    heightWeight: heightWeight.value[1],
    //此处应当使用 omit 的写法，以让以后添加的 额外 basic-info ref 能够自然的呈现
    ...omit(store.$state, [
      "name",
      "picture",
      "weight",
      "height",
      "showPhoto",
      "convertToAge",
      "additionalInfos",
    ]),
  };
  //order 的顺序决定显示的顺序
  let result: [keyof KeysType, string, string][] = order.map((key) => {
    let name = nameMap[key]; //转换为对应的 name
    let value = items[key]; //获取值
    if (!value) return [key, name, ""];
    switch (
      key //需要特殊处理的项
    ) {
      case "heightWeight": {
        name = heightWeight.value[0];
        break;
      }
      case "birth": {
        //存在空字符串的可能性，因此需要进行排除
        if (!value) return [key, name, value];
        const { convertToAge } = store;
        const date = new Date(value);
        const birthYear = date.getFullYear();
        const currentYear = new Date().getFullYear();
        name = convertToAge ? "年龄" : "出生年月";
        value = convertToAge
          ? String(currentYear - birthYear)
          : `${birthYear}-${date.getMonth() + 1}`;
        break;
      }
    }
    if (!(typeof value === "string"))
      throw new TypeError(
        `Unexpected BUG,value is of type:${Object.prototype.toString.call(
          value,
        )}, expected type is string.`,
      );
    return [key, name, value.trim()];
  });
  //过滤掉用户没填写的项
  return result.filter((entry) => {
    return entry[2].trim();
  });
});
</script>
<style module>
.dd {
  float: left;
  min-width: 50%;
  margin: 0;
  @apply py-0.5;
}
.name {
  display: inline-block;
  text-align-last: justify;
  @apply w-16 h-5;
}
</style>
