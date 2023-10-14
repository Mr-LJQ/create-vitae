<template>
  <div>
    <header
      class="flex justify-around items-center fixed left-0 top-0 z-10 w-full h-16 shadow-lg bg-white transition-all duration-300"
      :class="[drawerVisible ? '' : '-translate-y-16']"
    >
      <h1>
        <img src="/logo.svg" class="w-8 inline align-bottom" /><span
          class="text-2xl text-[#13a783]"
          >简历</span
        >
      </h1>
      <ul class="flex h-full">
        <li class="px-2">
          <GapController />
        </li>
        <li class="px-2">
          <TextController />
        </li>
        <li class="px-2">
          <SkinController />
        </li>
        <li class="px-2">
          <DownloadController />
        </li>
        <!--<li class="px-2">
          <MenuButton icon-name="template">更换模版</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="cover">标题封面</MenuButton>
        </li>
        <li class="px-2">
          <MenuButton icon-name="envelope">自荐信</MenuButton>
        </li>
        
        <li class="px-2">
          <MenuButton icon-name="upload">上传</MenuButton>
        </li> -->
      </ul>
      <ElDropdown class="bg-[#13d8a7] rounded-full">
        <span
          class="text-5xl text-white overflow-hidden rounded-full focus:outline outline-2 outline-[#13a783] icon_font_common icon-common-user"
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
        <ElIcon v-if="!drawerVisible" color="#13ce66" size="2rem"
          ><ArrowDown
        /></ElIcon>
        <ElIcon v-else color="#13ce66" size="2rem"><ArrowUp /></ElIcon>
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
import GapController from "./gap-controller/index.vue";
import TextController from "./text-controller/index.vue";
import SkinController from "./skin-controller/index.vue";
import DownloadController from "./download-controller/index.vue";
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
//async function downloadPDF() {}
</script>
