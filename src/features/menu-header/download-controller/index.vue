<template>
  <Popover>
    <PopoverButton icon-name="download">下载</PopoverButton>
    <PopoverTransition>
      <PopoverPanel class="w-96">
        <div class="relative grid gap-8 p-7">
          <a
            v-for="item in date"
            :key="item.name"
            :href="item.href"
            @click="item.handleClick"
            class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center text-white"
            >
              <img :src="item.icon" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-900">
                {{ item.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ item.description }}
              </p>
            </div>
          </a>
        </div>
      </PopoverPanel>
    </PopoverTransition>
  </Popover>
  <ExplainPDF v-model="isOpenExplainPDF" />
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import jsonIcon from "@/assets/images/json.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import {
  PopoverButton,
  PopoverTransition,
  Popover,
  PopoverPanel,
} from "@/components";
import ExplainPDF from "../explain-pdf/index.vue";
defineOptions({
  name: "DownLoadController",
});

const isOpenExplainPDF = ref(false);

const date = computed(() => [
  {
    href: "##",
    icon: pdfIcon,
    name: "下载为PDF",
    description: "将简历保存为PDF格式下载到本地",
    handleClick: () => {
      isOpenExplainPDF.value = true;
    },
  },
  {
    href: "##",
    icon: jsonIcon,
    name: "下载为JSON",
    description: "将简历相关数据提取为JSON格式下载到本地",
    handleClick: () => {},
  },
]);
</script>
