import { computed, onUnmounted, ref } from "vue";
import { defineStore, type StoreState } from "pinia";
import figure from "@/assets/images/figure.svg";
type AdditionalInfos = { [key in string]: string };

export const basicInfosDefault = {
  name: "",
  birth: null,
  phone: "",
  email: "",
  picture: void 0,
  yearsOfWorking: "",
  gender: "",
  maritalStatus: "",
  height: "",
  weight: "",
  nation: "",
  nativePlace: "",
  politicsStatus: "",
  convertToAge: true,
  showPhoto: true,
  get additionalInfos() {
    return {};
  },
};

export const useBasicInfosStore = defineStore(
  "BasicInfos",
  () => {
    const name = ref(basicInfosDefault.name);
    const birth = ref<Date | null>(basicInfosDefault.birth); //值为 null 是可能的，例如：当用户按下 clear 时
    const phone = ref(basicInfosDefault.phone);
    const email = ref(basicInfosDefault.email);
    const picture = ref<Blob>();
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
    let pictureObjectURL: string | null = null;
    const pictureUrl = computed(() => {
      if (picture.value) {
        pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
        pictureObjectURL = URL.createObjectURL(picture.value);
        return pictureObjectURL;
      }
      return figure;
    });
    onUnmounted(() => {
      pictureObjectURL && URL.revokeObjectURL(pictureObjectURL);
    });
    return {
      name,
      birth,
      phone,
      email,
      picture,
      pictureUrl,
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
      serialize(state) {
        const _state = JSON.stringify(state);
        const pictureFile = state.picture;
        return {
          _state,
          pictureFile,
        };
      },
      deserialize(data) {
        const state = JSON.parse(data._state);
        state.picture = data.pictureFile;
        return state;
      },
    },
  },
);

export type State = StoreState<ReturnType<typeof useBasicInfosStore>>;
