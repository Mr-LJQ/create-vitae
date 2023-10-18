import { ref, watch } from "vue";
import { defineStore } from "pinia";

export enum ModuleEnum {
  BasicInfos,
  JobIntention,
  EducationalBackground,
  CampusExperience,
  WorkExperience,
  ProjectExperience,
  InternshipExperience,
  CustomModule,
  Certificate,
  Specialty,
  SelfEvaluation,
  Interests,
}

const {
  Interests,
  Specialty,
  BasicInfos,
  Certificate,
  CustomModule,
  JobIntention,
  SelfEvaluation,
  WorkExperience,
  CampusExperience,
  ProjectExperience,
  InternshipExperience,
  EducationalBackground,
} = ModuleEnum;

export const modulesInfosDefault = {
  get moduleNameMap() {
    return {
      [BasicInfos]: "基本信息",
      [JobIntention]: "求职意向",
      [EducationalBackground]: "教育背景",
      [CampusExperience]: "校园经历",
      [WorkExperience]: "工作经验",
      [ProjectExperience]: "项目经验",
      [InternshipExperience]: "实习经历",
      [CustomModule]: "自定义",
      [Certificate]: "荣誉证书",
      [Specialty]: "技能特长",
      [SelfEvaluation]: "自我评价",
      [Interests]: "兴趣爱好",
    };
  },
  get modulesOrder() {
    return [
      Interests,
      Specialty,
      Certificate,
      CustomModule,
      JobIntention,
      SelfEvaluation,
      WorkExperience,
      CampusExperience,
      ProjectExperience,
      InternshipExperience,
      EducationalBackground,
    ] as Exclude<ModuleEnum, ModuleEnum.BasicInfos>[];
  },
  get openedModules() {
    return {
      [JobIntention]: true,
      [EducationalBackground]: true,
      [CampusExperience]: false,
      [WorkExperience]: true,
      [ProjectExperience]: true,
      [InternshipExperience]: false,
      [CustomModule]: false,
      [Certificate]: true,
      [Specialty]: true,
      [SelfEvaluation]: true,
      [Interests]: false,
    };
  },
};

export const useModulesInfosStore = defineStore("modules-infos", () => {
  const moduleNameMap = ref<Record<ModuleEnum, string>>(
    modulesInfosDefault.moduleNameMap,
  );
  const modulesOrder = ref<Exclude<ModuleEnum, ModuleEnum.BasicInfos>[]>(
    modulesInfosDefault.modulesOrder,
  );
  const openedModules = ref(modulesInfosDefault.openedModules);
  watch(
    openedModules,
    () => {
      const closed: Exclude<ModuleEnum, ModuleEnum.BasicInfos>[] = [];
      const opened: Exclude<ModuleEnum, ModuleEnum.BasicInfos>[] = [];
      modulesOrder.value.forEach((val) => {
        const switchStatus = openedModules.value;
        if (switchStatus[val]) {
          opened.push(val);
        } else {
          closed.push(val);
        }
      });
      modulesOrder.value = opened.concat(closed);
    },
    {
      immediate: true,
      deep: true,
    },
  );
  return {
    modulesOrder,
    moduleNameMap,
    openedModules,
  };
});
