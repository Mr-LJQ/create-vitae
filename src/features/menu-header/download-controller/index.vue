<template>
  <Popover>
    <PopoverButton icon-name="download">文件管理</PopoverButton>
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
          <input
            hidden
            type="file"
            ref="fileInputRef"
            accept="application/json"
            @change="handleUploadJSON"
          />
        </div>
      </PopoverPanel>
    </PopoverTransition>
  </Popover>
  <ExplainPDF
    v-if="store.showPDFExplain"
    v-model="isOpenExplainPDF"
    :openPrintPage="openPrintPage"
    @whetherShowPDFExplain="whetherShowPDFExplain"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import jsonIcon from "@/assets/images/json.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import uploadIcon from "@/assets/images/upload.svg";
import {
  PopoverButton,
  PopoverTransition,
  Popover,
  PopoverPanel,
} from "@/components";
import { useConfigurationStore } from "@/stores";
import { downloadJSON, uploadJSON } from "./utils";
import ExplainPDF from "../explain-pdf/index.vue";
defineOptions({
  name: "DownLoadController",
});

const store = useConfigurationStore();
const isOpenExplainPDF = ref(false);

function handleClickPDF() {
  if (store.showPDFExplain) {
    isOpenExplainPDF.value = true;
  } else {
    openPrintPage();
  }
}

const fileInputRef = ref<HTMLInputElement | null>(null);
const date = [
  {
    href: "##",
    icon: pdfIcon,
    name: "下载为PDF",
    handleClick: handleClickPDF,
    description: "将简历保存为PDF格式下载到本地",
  },
  {
    href: "##",
    icon: jsonIcon,
    name: "下载为JSON",
    description: "将简历相关数据提取为JSON格式下载到本地",
    handleClick: downloadJSON,
  },
  {
    href: "##",
    icon: uploadIcon,
    name: "加载本地JSON数据",
    handleClick: () => {
      fileInputRef.value?.click();
    },
    description: "加载本地简历数据到网页进行展示",
  },
];

function handleUploadJSON(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file == null) return;
  uploadJSON(file);
}

function whetherShowPDFExplain(value: boolean) {
  store.showPDFExplain = value;
}

function openPrintPage() {
  window.print();
}
</script>
