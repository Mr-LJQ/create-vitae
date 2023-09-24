<template>
  <div>
    <header
      class="flex justify-around items-center fixed left-0 top-0 z-10 w-full h-16 shadow-lg bg-white transition-all duration-300 icon_font_common"
      :class="[drawerVisible ? '' : '-translate-y-16']"
    >
      <h1 class="text-[#13d8a7] text-[2.5rem]">
        <span class="icon-common-vitae"></span>简历生成
      </h1>
      <ul class="flex h-full">
        <li class="px-2">
          <MenuButton icon-name="line_padding">设置间距</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="font">字体语言</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="skin">皮肤设置</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="template">更换模版</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="cover">标题封面</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="envelope">自荐信</MenuButton>
        </li>
      </ul>
      <button
        class="px-2 text-[#13d8a7] leading-8 focus:outline-[#13d8a7] focus:bg-[rgba(19,216,167,.1)] focus:text-[#13a783] hover:text-[#13a783] hover:bg-[rgba(19,216,167,.1)] border-[#13d8a7] border rounded-full"
        @click="downloadPDF"
      >
        <span class="text-xl align-middle icon-common-download"></span>
        <span>下载</span>
      </button>
      <button
        class="px-2 text-[#13d8a7] leading-8 focus:outline-[#13d8a7] focus:bg-[rgba(19,216,167,.1)] focus:text-[#13a783] hover:text-[#13a783] hover:bg-[rgba(19,216,167,.1)] border-[#13d8a7] border rounded-full"
      >
        <span class="text-xl align-middle icon-common-upload"></span>
        <span>上传</span>
      </button>
      <ElDropdown class="bg-[#13d8a7] rounded-full">
        <span
          class="text-5xl text-white overflow-hidden rounded-full focus:outline outline-2 outline-[#13a783] icon-common-user"
        ></span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>其它简历</ElDropdownItem>
            <ElDropdownItem>清除此简历数据</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <span
        class="absolute right-0 -bottom-8 inline-block box-border w-8 h-8 rounded-bl-xl shadow-lg bg-white cursor-pointer"
        @click="toggleDrawer"
      >
        <ElIcon v-if="!drawerVisible" size="2rem"><ArrowDown /></ElIcon>
        <ElIcon v-else size="2rem"><ArrowUp /></ElIcon>
      </span>
    </header>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  ElIcon,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from "element-plus";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import "@/assets/icon-font-common/iconfont.css";
import { MenuButton } from "@/components";
defineOptions({
  name: "MenuHeader",
});
/**
 * 控制 Drawer 组件的显示与隐藏
 */
const drawerVisible = ref(true);
function toggleDrawer() {
  drawerVisible.value = !drawerVisible.value;
}
/**
 * 下载为 PDF
 */
async function downloadPDF() {}
</script>
