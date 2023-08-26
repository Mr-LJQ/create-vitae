import { defineComponent } from "vue";
import { ElSelect, ElDatePicker, ElOption, ElCheckbox } from "element-plus";
import { isString } from "@/utils";
import {
  AUTO_WRAP,
  EDIT_INPUT_ITEM_INPUT,
  OVERRIDE_EL_INPUT_CLASS,
} from "@/styles";
import { useBasicInfoStore } from "@/stores/basic-info";
import EditInputItem from "@/components/edit-input-item/index.vue";
import FileButton from "./FileButton.vue";
import type { SetupContext, InputHTMLAttributes, ReservedProps } from "vue";


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
const yearsOfWorkingOptions = [
  "不填",
  "应届生",
  "1年经验",
  "2年经验",
  "3年经验",
  "4年经验",
  "5年经验",
  "6年经验",
  "7年经验",
  "8年经验",
  "9年经验",
  "10年经验",
  "11年经验",
  "12年经验",
  "13年经验",
  "14年经验",
  "15年以上经验",
  "20年以上经验",
  "25年以上经验",
];

export default defineComponent(
  () => {
    const store = useBasicInfoStore();
    const createVModel = <T extends typeof store, K extends keyof typeof store>(
      name: K
    ) => {
      return {
        modelValue: store[name],
        "onUpdate:modelValue": (val: T[K]) => {
          console.log(val);
          store[name] = val;
        },
      };
    };

    return () => {
      const items = [
        {
          label: "您的姓名",
          component: (
            <Input placeholder="请输入您的姓名" {...createVModel("name")} />
          ),
        },
        {
          label: "出生年月",
          component: (
            <>
              <ElDatePicker
                type="month"
                placeholder="选择年月"
                {...createVModel("birth")}
              />
              {store.birth && (
                //@ts-ignore 这是 ElCheckbox 本身的问题
                <ElCheckbox label="转年龄" {...createVModel("convertToAge")} />
              )}
            </>
          ),
        },
        {
          label: "联系电话",
          component: (
            <Input placeholder="输入联系电话" {...createVModel("phone")} />
          ),
        },
        {
          label: "联系邮箱",
          component: (
            <Input placeholder="输入联系邮箱" {...createVModel("email")} />
          ),
        },
        {
          label: "工作年限",
          component: (
            <ElSelect {...createVModel("yearsOfWorking")} placeholder="不填">
              {yearsOfWorkingOptions.map((val) => (
                <ElOption key={val} label={val} value={val} />
              ))}
            </ElSelect>
          ),
        },
        {
          label: "照片设置",
          component: (
            <>
              <FileButton />
              {/* @ts-ignore */}
              <ElCheckbox {...createVModel("showPhoto")} label="展示照片" />
            </>
          ),
        },
        {
          label: "性别",
          component: (
            <ElSelect {...createVModel("gender")} placeholder="不填">
              {genderOptions.map((value) => (
                <ElOption key={value} label={value} value={value} />
              ))}
            </ElSelect>
          ),
        },
        {
          label: "婚姻状况",
          component: (
            <ElSelect {...createVModel("maritalStatus")} placeholder="不填">
              {maritalStatusOptions.map((value) => (
                <ElOption key={value} label={value} value={value} />
              ))}
            </ElSelect>
          ),
        },
        {
          label: "身高/体重",
          component: (
            <>
              <Input
                class="w60"
                type="text"
                placeholder="身高"
                {...createVModel("height")}
              />
              cm
              <Input
                class="w60 ml20"
                type="text"
                placeholder="体重"
                {...createVModel("weight")}
              />
              kg
            </>
          ),
        },
        {
          label: "民族",
          component: (
            <Input
              type="text"
              placeholder="请输入民族"
              {...createVModel("nation")}
            />
          ),
        },
        {
          label: "籍贯",
          component: (
            <Input
              type="text"
              placeholder="请输入籍贯"
              {...createVModel("nativePlace")}
            />
          ),
        },
        {
          label: "政治面貌",
          component: (
            <ElSelect {...createVModel("politicsStatus")} placeholder="不填">
              {politicsStatusOptions.map((value) => (
                <ElOption key={value} label={value} value={value} />
              ))}
            </ElSelect>
          ),
        },
      ];
      return (
        <ul class={AUTO_WRAP}>
          {items.map(({ label, component }) => (
            <EditInputItem
              key={label}
              class={OVERRIDE_EL_INPUT_CLASS}
              labelText={label}
            >
              {() => component}
            </EditInputItem>
          ))}
        </ul>
      );
    };
  },
  {
    name: "BasicInfo",
  }
);

type InputProps = {
  modelValue: string;
  "onUpdate:modelValue"(val: string): void;
} & InputHTMLAttributes &
  ReservedProps;

type InputEvent = {
  "update:modelValue"(val: string): void;
};

function Input(props: InputProps, { emit }: SetupContext<InputEvent>) {
  const handleInput = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  };
  return (
    <input
      type="text"
      value={props.modelValue}
      onInput={handleInput}
      class={EDIT_INPUT_ITEM_INPUT}
    />
  );
}

Input.props = {
  modelValue: {
    type: String,
    required: true,
  },
};

Input.emits = {
  "update:modelValue": (payload: string) => isString(payload),
};
