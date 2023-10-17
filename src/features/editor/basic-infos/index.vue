<template>
  <div class="max-w-[75rem] mx-auto pl-12 box-content outline-none">
    <ul class="mb-4" :class="[BORDER_B_DASHED, GRID_AUTO_CENTER]">
      <EditInputItem v-slot="{ id }" label-text="您的姓名">
        <EditInput :id="id" placeholder="请输入您的姓名" v-model="store.name" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="出生年月">
        <ElDatePicker
          :id="id"
          type="month"
          placeholder="选择年月"
          v-model="birth"
          :default-value="defaultBirth"
          :disabled-date="notFuture"
          :editable="false"
        />
        <ElCheckbox
          v-if="store.birth"
          v-model="store.convertToAge"
          label="转年龄"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系电话">
        <EditInput
          @blur="phoneInputBlur"
          :id="id"
          placeholder="输入联系电话"
          v-model="store.phone"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="联系邮箱">
        <EditInput
          @blur="emailInputBlur"
          :id="id"
          placeholder="输入联系邮箱"
          v-model="store.email"
        />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="工作年限">
        <ElSelect :id="id" v-model="store.yearsOfWorking" placeholder="不填">
          <ElOption
            v-for="value in yearsOfWorkingOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="照片设置">
        <FileButton @change="handleFileChange" accept="image/*" />
        <ElCheckbox :id="id" v-model="store.showPhoto" label="展示照片" />
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="性别">
        <ElSelect :id="id" v-model="store.gender" placeholder="不填">
          <ElOption
            v-for="value in genderOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="婚姻状况">
        <ElSelect :id="id" v-model="store.maritalStatus" placeholder="不填">
          <ElOption
            v-for="value of maritalStatusOptions"
            :key="value"
            :label="value"
            :value="value"
          />
        </ElSelect>
      </EditInputItem>
      <EditInputItem v-slot="{ id }" label-text="身高体重">
        <EditInput
          :id="id"
          style="width: 60px"
          placeholder="身高"
          class="mr-1"
          v-model="store.height"
        />cm
        <EditInput
          class="ml-4 mr-1"
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
        <ElSelect :id="id" v-model="store.politicsStatus" placeholder="不填">
          <ElOption
            v-for="value of politicsStatusOptions"
            :key="value"
            :label="value"
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
        class="mr-2"
        placeholder="信息内容，例如：张三"
      />
      <ElButton @click="addCustomInfo">添加自定义项</ElButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
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

import { useBasicInfosStore } from "@/stores";
import { BORDER_B_DASHED, GRID_AUTO_CENTER } from "@/styles";
import { EditInputItem, EditInput, FileButton } from "@/components";
import {
  propsType,
  defaultBirth,
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
          lockScroll: false, //避免锁定滚动条，因为锁定滚动条会导致布局发生变化，性能与体验都不好
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

const birth = computed({
  get() {
    /**
     * 注意，此处的 ! 是为了避免一个类型错误，原因是因为 ElDatePicker 的 v-model 不支持 null类型，
     *  但实际上，当使用 clearable 功能使，其返回的值就是一个 null 类型，
     *    因此这应当算是一个 ElDatePicker 的类型BUG.
     */
    return store.birth!;
  },
  set(value) {
    return (store.birth = value);
  },
});
/**
 * 图片上传相关逻辑
 */

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file == null) return;
  store.picture = file;
}

/**
 * 出生日期必定不能够是在未来，因此需要限制用户的选择范围
 */
function notFuture(date: Date) {
  return new Date() < date;
}

/**
 * 对用户输入的邮箱进行验证，如果邮箱格式错误，则弹出一个提示（非强制性的）
 */

const emailRule =
  /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
function emailInputBlur() {
  if (!store.email.trim()) return;
  const validated = emailRule.test(store.email);
  if (validated) return;
  ElNotification.warning({
    title: "提醒",
    message: `邮箱：${store.email.trim()} 可能存在错误，请再次检查（如确认无误可忽略该信息）。`,
  });
}

/**
 * 对用户输入的手机号进行验证，如果格式错误，则弹出一个提示（非强制性）
 */
const phoneRule = /^1[3-9]\d{9}$/;
function phoneInputBlur() {
  const phone = store.phone.trim();
  if (!phone) return;
  const validated = phoneRule.test(phone);
  if (validated) return;
  ElNotification.warning({
    title: "提醒",
    message: `电话：${phone} 可能存在错误，请再次检查（如确认无误可忽略该信息）。`,
  });
}
</script>
