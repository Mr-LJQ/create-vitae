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

export const useModulesInfosStore = defineStore("modules-infos", () => {
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
  const moduleNameMap = ref<Record<ModuleEnum, string>>({
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
  });
  const modulesOrder = ref<Exclude<ModuleEnum, ModuleEnum.BasicInfos>[]>([
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
  ]);
  const openedModules = ref({
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
  });
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
