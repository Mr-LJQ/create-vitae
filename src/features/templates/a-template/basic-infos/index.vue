<template>
  <section class="flex text-[#333]">
    <div>
      <img class="w-32" :src="pictureUrl" alt="照片" />
    </div>
    <div>
      <dl class="pl-8">
        <dt class="mb-[0.65rem]">
          <strong class="text-2xl leading-[2.88rem]">{{ store.name }}</strong>
        </dt>
        <dd :key="key" :class="$style.dd" v-for="[key, name, value] of infos">
          <span
            :class="[`mr-3 align-top iconfont icon-${iconMap[key]}`]"
          /><span :class="$style.name">{{ name }}</span
          >：{{ value }}
        </dd>
        <dd
          :key="key"
          :class="$style.dd"
          v-for="(value, key) of store.additionalInfos"
        >
          <span :class="[`mr-3 align-top iconfont icon-${customIcon}`]" /><span
            :class="$style.name"
            >{{ key }}</span
          >：{{ value }}
        </dd>
      </dl>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { computed, onUnmounted } from "vue";
import "@/assets/fonts/iconfont.css";
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
  const { height, weight } = store;
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
 * 处理照片
 */
let pictureObjectURL: string | null = null;
const pictureUrl = computed(() => {
  if (store.picture) {
    pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
    pictureObjectURL = URL.createObjectURL(store.picture);
    return pictureObjectURL;
  }
  return "";
});
onUnmounted(() => {
  pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
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
  let result: [keyof KeysType, string, string | null][] = order.map((key) => {
    let name = nameMap[key]; //转换为对应的 name
    let value = items[key]; //获取值
    if (!value.trim()) return [key, name, value];
    switch (
      key //需要特殊处理的项
    ) {
      case "heightWeight": {
        name = heightWeight.value[0];
        break;
      }
      case "birth": {
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
    return [key, name, value];
  });
  //过滤掉用户没填写的项
  return result.filter((entry) => {
    return entry[2];
  });
});
</script>
<style module>
.dd {
  float: left;
  font-size: 13px;
  min-width: 50%;
  margin: 0;
  @apply py-0.5;
}
.name {
  display: inline-block;
  text-align-last: justify;
  vertical-align: middle;
  @apply w-14 h-5;
}
</style>
