import { ref } from "vue";
import { defineStore } from "pinia";
type AdditionalInfos = { [key in string]: string };

export const basicInfosDefault = {
  name: "",
  phone: "",
  email: "",
  gender: "",
  height: "",
  weight: "",
  nation: "",
  birth: null,
  showPhoto: true,
  nativePlace: "",
  maritalStatus: "",
  politicsStatus: "",
  yearsOfWorking: "",
  convertToAge: true,
  get additionalInfos() {
    return {};
  },
};

export const useBasicInfosStore = defineStore(
  "basic-infos",
  () => {
    const name = ref(basicInfosDefault.name);
    const birth = ref<Date | null>(basicInfosDefault.birth); //值为 null 是可能的，例如：当用户按下 clear 时
    const phone = ref(basicInfosDefault.phone);
    const email = ref(basicInfosDefault.email);
    const yearsOfWorking = ref(basicInfosDefault.yearsOfWorking);
    const gender = ref(basicInfosDefault.gender);
    const maritalStatus = ref(basicInfosDefault.maritalStatus);
    const height = ref(basicInfosDefault.height);
    const weight = ref(basicInfosDefault.weight);
    const nation = ref(basicInfosDefault.nation);
    const nativePlace = ref(basicInfosDefault.nativePlace);
    const politicsStatus = ref(basicInfosDefault.politicsStatus);
    const convertToAge = ref(basicInfosDefault.convertToAge);
    const showPhoto = ref(basicInfosDefault.showPhoto);
    const additionalInfos = ref<AdditionalInfos>(
      basicInfosDefault.additionalInfos,
    );
    function addInfo(key: string, value: string) {
      additionalInfos.value[key] = value;
    }
    function deleteInfo(key: string) {
      return delete additionalInfos.value[key];
    }
    function hasInfo(key: string) {
      return Object.prototype.hasOwnProperty.call(additionalInfos.value, key);
    }

    return {
      name,
      birth,
      phone,
      email,
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
  },
  {
    persistedState: {
      deserialize(jsonData) {
        const state = JSON.parse(jsonData);
        if (state.birth) {
          state.birth = new Date(state.birth);
        }
        return state;
      },
    },
  },
);

export type BasicInfoState = ReturnType<typeof useBasicInfosStore>["$state"];
