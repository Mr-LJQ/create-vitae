<template>
  <Popover as="div" class="relative h-full">
    <PopoverButton icon-name="download">下载</PopoverButton>
    <PopoverTransition>
      <PopoverPanel
        class="absolute z-10 left-1/2 -translate-x-1/2 mt-3 w-screen max-w-sm transform px-4"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="relative grid gap-8 bg-white p-7">
            <a
              v-for="item in date"
              :key="item.name"
              :href="item.href"
              class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center text-white"
              >
                <img :src="item.icon" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  {{ item.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </PopoverPanel>
    </PopoverTransition>
  </Popover>
</template>
<script lang="ts" setup>
import jsonIcon from "@/assets/images/json.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import { PopoverButton, PopoverTransition } from "@/components";
import { Popover, PopoverPanel } from "@headlessui/vue";
defineOptions({
  name: "DownLoadController",
});
const date = [
  {
    href: "##",
    icon: pdfIcon,
    name: "下载为PDF",
    description: "将简历保存为PDF格式下载到本地",
  },
  {
    href: "##",
    icon: jsonIcon,
    name: "下载为JSON",
    description: "将简历相关数据提取为JSON格式下载到本地",
  },
];
</script>
