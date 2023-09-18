<template>
  <div class="max-w-[1200px] mx-auto">
    <ul class="mb-4" :class="[BORDER_B_DASHED, GRID_AUTO_CENTER]">
      <EditInputItem v-slot="{ id }" label-text="您的姓名">
        <EditInput :id="id" placeholder="请输入您的姓名" v-model="store.name" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="出生年月">
        <ElDatePicker
          :id="id"
          type="month"
          placeholder="选择年月"
          v-model="store.birth"
        />
        <ElCheckbox
          v-if="store.birth"
          v-model="store.convertToAge"
          label="转年龄"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系电话">
        <EditInput :id="id" placeholder="输入联系电话" v-model="store.phone" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系邮箱">
        <EditInput :id="id" placeholder="输入联系邮箱" v-model="store.email" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="工作年限">
        <ElSelect :id="id" v-model="store.yearsOfWorking">
          <ElOption
            v-for="value in yearsOfWorkingOptions"
            :key="value"
            :label="value || '不填'"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="照片设置">
        <FileButton @change="handleFileChange" accept="image/*" />
        <ElCheckbox :id="id" v-model="store.showPhoto" label="展示照片" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="性别">
        <ElSelect :id="id" v-model="store.gender">
          <ElOption
            v-for="value in genderOptions"
            :key="value"
            :label="value || '不填'"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="婚姻状况">
        <ElSelect :id="id" v-model="store.maritalStatus">
          <ElOption
            v-for="value of maritalStatusOptions"
            :key="value"
            :label="value || '不填'"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="身高/体重">
        <EditInput
          :id="id"
          style="width: 60px"
          placeholder="身高"
          v-model="store.height"
        />cm
        <EditInput
          class="ml-4"
          placeholder="体重"
          style="width: 60px"
          v-model="store.weight"
        />kg
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="民族">
        <EditInput :id="id" placeholder="请输入民族" v-model="store.nation" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="籍贯">
        <EditInput
          :id="id"
          placeholder="请输入籍贯"
          v-model="store.nativePlace"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="政治面貌">
        <ElSelect :id="id" v-model="store.politicsStatus">
          <ElOption
            v-for="value of politicsStatusOptions"
            :key="value"
            :label="value || '不填'"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
    </ul>
    <ul
      v-if="Object.keys(additionalInfos).length >= 1"
      :class="GRID_AUTO_CENTER"
    >
      <EditInputItem
        :key="key"
        v-slot="{ id }"
        :label-text="key"
        v-for="(_, key) of additionalInfos"
      >
        <EditInput :id="id" v-model="additionalInfos[key]" />
        <ElButton
          circle
          size="small"
          type="danger"
          :icon="Delete"
          class="ml-2"
          @click="deleteInfo(key)"
        />
      </EditInputItem>
    </ul>
    <div class="mb-4">
      <EditInput
        v-model="customKeyRef"
        ref="customKeyElementRef"
        placeholder="信息名称，例如：姓名"
      />
      :
      <EditInput
        v-model="customValueRef"
        ref="customValueElementRef"
        placeholder="信息内容，例如：张三"
      />
      <ElButton class="ml-2" @click="addCustomInfo">添加自定义项</ElButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  ElOption,
  ElSelect,
  ElButton,
  ElCheckbox,
  ElDatePicker,
  ElMessageBox,
  ElNotification,
} from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { useBasicInfosStore } from "@/stores/basic-infos";
import EditInputItem from "@/components/edit-input-item/index.vue";
import EditInput from "@/components/edit-input/index.vue";
import FileButton from "@/components/buttons/FileButton.vue";
import { BORDER_B_DASHED, GRID_AUTO_CENTER } from "@/styles";
import {
  propsType,
  genderOptions,
  maritalStatusOptions,
  politicsStatusOptions,
  yearsOfWorkingOptions,
} from ".";
defineOptions({
  name: "BasicInfos",
});
defineProps(propsType);
const store = useBasicInfosStore();
const { addInfo, deleteInfo, hasInfo } = store;
const { additionalInfos } = storeToRefs(store);
/**
 * 自定义项相关逻辑
 */

const customKeyRef = ref("");
const customValueRef = ref("");
const customKeyElementRef = ref<HTMLInputElement | null>(null);
const customValueElementRef = ref<HTMLInputElement | null>(null);
function addCustomInfo() {
  const key = customKeyRef.value.trim();
  const value = customValueRef.value.trim();
  //用户未输入任何内容/输入不全，却点击提交，此时提用户聚焦到未输入的元素中
  if (key === "" || value === "") {
    console.log(customKeyElementRef.value);
    key === ""
      ? customKeyElementRef.value?.focus()
      : customValueElementRef.value?.focus();
    return;
  }
  //如果 key 已存在，则对用户进行提醒
  if (hasInfo(key)) {
    // key 与 value 均已存在,向用户发出提醒
    if (additionalInfos.value[key] === value) {
      ElNotification.warning({
        title: "提醒",
        message: `内容：${key}:${value} 已经添加，重复添加无效。`,
        position: "top-left",
        offset: 100,
      });
      return;
    } else {
      // key 已存在，询问用户是否覆盖 value
      ElMessageBox.confirm(
        `内容名称：${key} 已经添加，请问是否覆盖？`,
        "提醒",
        {
          confirmButtonText: "覆盖",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          addInfo(key, value);
        })
        .catch(() => {
          /* 避免报未捕获错误 */
        });
      return;
    }
  }
  //成功添加，清除当前输入
  addInfo(key, value);
  customKeyRef.value = "";
  customValueRef.value = "";
}

/**
 * 图片上传相关逻辑
 */

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file == null) return;
  store.picture = file;
}
</script>
