import { ref, reactive } from "vue";
import { defineStore } from "pinia";

type AdditionalInfos = { [key in string]: string };

export interface State {
  name: string;
  birth: string;
  phone: string;
  email: string;
  picture: string;
  yearsOfWorking: string;
  gender: string;
  maritalStatus: string;
  height: string;
  weight: string;
  nation: string;
  nativePlace: string;
  politicsStatus: string;
  convertToAge: boolean;
  showPhoto: boolean;
  additionalInfos: AdditionalInfos;
}

export const useBasicInfoStore = defineStore("BasicInfo", () => {
  const name = ref("");
  const birth = ref("");
  const phone = ref("");
  const email = ref("");
  const picture = ref("");
  const yearsOfWorking = ref("不填");
  const gender = ref("不填");
  const maritalStatus = ref("不填");
  const height = ref("");
  const weight = ref("");
  const nation = ref("");
  const nativePlace = ref("");
  const politicsStatus = ref("不填");
  const convertToAge = ref(false);
  const showPhoto = ref(false);
  const additionalInfos = reactive<AdditionalInfos>({});
  function addInfo(key: string, value: string) {
    additionalInfos[key] = value;
  }
  function deleteInfo(key: string) {
    return delete additionalInfos[key];
  }
  function hasInfo(key: string) {
    return Object.prototype.hasOwnProperty.call(additionalInfos, key);
  }
  return {
    name,
    birth,
    phone,
    email,
    picture,
    yearsOfWorking,
    gender,
    maritalStatus,
    height,
    weight,
    nation,
    nativePlace,
    politicsStatus,
    convertToAge,
    showPhoto,
    additionalInfos,
    addInfo,
    hasInfo,
    deleteInfo,
  };
});
