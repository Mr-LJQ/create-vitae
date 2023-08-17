<template>
  <ul class="container">
    <li class="item">
      <label class="label" for="">您的姓名</label>
      <input
        class="input"
        type="text"
        placeholder="请输入您的姓名"
        v-model="store.name"
      />
    </li>
    <li class="item">
      <label class="label" for="">出生年月</label>
      <el-date-picker
        :class="$style.a"
        type="month"
        placeholder="选择年月"
        v-model="store.birth"
      />
      <el-checkbox
        v-if="store.birth"
        v-model="store.convertToAge"
        label="转年龄"
      />
    </li>
    <li class="item">
      <label class="label" for="">联系电话</label>
      <input
        class="input"
        type="text"
        placeholder="输入联系电话"
        v-model="store.phone"
      />
    </li>
    <li class="item">
      <label class="label" for="">联系邮箱</label>
      <input
        class="input"
        type="text"
        placeholder="输入联系邮箱"
        v-model="store.email"
      />
    </li>
    <li class="item">
      <label class="label" for="">工作年限</label>
      <el-select v-model="store.yearsOfWorking" placeholder="不填" size="small">
        <el-option
          v-for="value in yearsOfWorkingOptions"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
    </li>
    <li class="item">
      <label class="label" for="">照片设置</label>
      <span class="upload_photo" @click="handleUploadFileClick">
        上传照片
        <input type="file" ref="fileInput" />
      </span>
      <el-checkbox v-model="store.showPhoto" label="展示照片" />
    </li>
    <li class="item">
      <label class="label" for="">性别</label>
      <el-select v-model="store.gender" placeholder="不填" size="small">
        <el-option
          v-for="value in genderOptions"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
    </li>
    <li class="item">
      <label class="label" for="">婚姻状况</label>
      <el-select v-model="store.maritalStatus" placeholder="不填" size="small">
        <el-option
          v-for="value of maritalStatusOptions"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
    </li>
    <li class="item">
      <label class="label" for="">身高/体重</label>
      <input
        class="input w60"
        type="text"
        placeholder="身高"
        v-model="store.height"
      />
      cm
      <input
        class="input w60 ml20"
        type="text"
        placeholder="体重"
        v-model="store.weight"
      />
      kg
    </li>
    <li class="item">
      <label class="label" for="">民族</label>
      <input
        class="input"
        type="text"
        placeholder="请输入民族"
        v-model="store.nation"
      />
    </li>
    <li class="item">
      <label class="label" for="">籍贯</label>
      <input
        class="input"
        type="text"
        placeholder="请输入籍贯"
        v-model="store.nativePlace"
      />
    </li>
    <li class="item">
      <label class="label" for="">政治面貌</label>
      <el-select v-model="store.politicsStatus" placeholder="不填" size="small">
        <el-option
          v-for="value of politicsStatusOptions"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useBasicInfoStore } from "@/stores/basic-info";
import { ElSelect, ElDatePicker, ElOption, ElCheckbox } from "element-plus";
const input = ref("");
const store = useBasicInfoStore();
const politicsStatusOptions = [
  "不填",
  "中共党员",
  "中共预备党员",
  "共青团员",
  "普通公民",
  "群众",
];
const maritalStatusOptions = ["不填", "已婚", "未婚", "离异", "已婚已育"];
const genderOptions = ["不填", "男", "女"];
const yearsOfWorkingOptions = ["不填", "应届生"];
for (let i = 1; i < 18; i++) {
  if (i >= 15) {
    yearsOfWorkingOptions.push(15 + (i - 15) * 5 + "年以上经验");
  } else {
    yearsOfWorkingOptions.push(i + "年经验");
  }
}

/**
 * 自定义文件上传按钮相关逻辑
 */
const fileInput = ref<HTMLInputElement>();

function handleUploadFileClick() {
  fileInput.value?.click();
}
</script>

<style module>
.a {
  --el-date-editor-width: 100px;
}
</style>

<style scoped lang="scss">
@use "sass:math";
$item_height: 32px;

.container {
  //实现自动换行
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  //继承属性
  color: #333;
  font-size: 14px;
}

.upload_photo {
  box-sizing: border-box;
  display: inline-block;
  width: 100px;
  line-height: $item_height;
  font-size: 12px;
  text-align: center;
  border-radius: math.div($item_height, 2);
  vertical-align: top;
  cursor: pointer;
  background-color: #13d8a7;
  color: #fff;
  input {
    width: 0;
    height: 0;
    opacity: 0;
    border: none;
  }
}

.label {
  display: inline-block;
  vertical-align: top;
  min-width: 65px;
  line-height: $item_height;
  text-align: right;
  padding-right: 10px;
}

.item {
  min-width: 295px;
  margin-bottom: 15px;
}

.input {
  box-sizing: border-box;
  border: none;
  padding: 0 15px;
  outline: none;
  width: 180px;
  background-color: #f3f4f6;
  border: 1px solid #f0f4f6;
  border-radius: 3px;
  height: $item_height;
  line-height: $item_height;
  font-size: 13px;
  color: #606266;
  &.w60 {
    width: 60px;
  }
  &.ml20 {
    margin-left:20px;
  }
}
</style>
