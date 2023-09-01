import type { PropType } from "vue";
import type { AModuleData } from "@/types";
type F = (index: number) => void;
type O = {
  label: string;
  placeholder: string;
  placeholder2?: string;
};

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
  firstItem: {
    type: Object as PropType<O>,
    required: true,
  },
  secondItem: {
    type: Object as PropType<O>,
    required: true,
  },
  thirdItem: {
    type: Object as PropType<Required<O>>,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  addNewItem: { type: Function as PropType<() => void>, required: true },
  deleteItem: {
    type: Function as PropType<F>,
    required: true,
  },
  moveUpItem: {
    type: Function as PropType<F>,
    required: true,
  },
  moveDownItem: {
    type: Function as PropType<F>,
    required: true,
  },
  dataList: {
    type: Array as PropType<AModuleData[]>,
    required: true,
  },
  defaultTimeValue: Object as PropType<[Date, Date]>,
} as const;
