import type { PropType } from "vue";
import type { State as BasicInfoState } from "@/stores/basic-info";

export const propsType = {
  basicInfos: {
    type: Object as PropType<BasicInfoState>,
    required: true,
  },
  jobIntention: {},
  educationalBackground: {},
  workExperience: {},
  projectExperience: {},
  internshipExperience: {},
  campusExperience: {},
  specialty: {},
  certificate: {},
  selfEvaluation: {},
  interests: {},
  customModule: {},
} as const;

/**
 * 通过 key 值映射到相应的图标类名上
 */

export type IconMap = Record<
  | keyof Omit<
      BasicInfoState,
      | "name"
      | "additionalInfos"
      | "picture"
      | "convertToAge"
      | "showPhoto"
      | "height"
      | "weight"
    >
  | "heightOrWidth",
  string
>;

export const iconMap: IconMap = {
  birth: "nianling",
  phone: "dianhua",
  email: "youxiang",
  yearsOfWorking: "gongzuonianxian",
  maritalStatus: "keaide",
  gender: "xingbie",
  nation: "minzu",
  nativePlace: "nianling",
  politicsStatus: "zhengzhi",
  heightOrWidth: "celiang",
};

export const customIcon = "18";
