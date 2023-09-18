import { ref } from "vue";
import { defineStore } from "pinia";
import type { StoreState } from "pinia";
type AdditionalInfos = { [key in string]: string };

export const useBasicInfosStore = defineStore(
  "BasicInfos",
  () => {
    const name = ref("");
    const birth = ref("");
    const phone = ref("");
    const email = ref("");
    const picture = ref<File>();
    const yearsOfWorking = ref("");
    const gender = ref("");
    const maritalStatus = ref("");
    const height = ref("");
    const weight = ref("");
    const nation = ref("");
    const nativePlace = ref("");
    const politicsStatus = ref("");
    const convertToAge = ref(false);
    const showPhoto = ref(false);
    const additionalInfos = ref<AdditionalInfos>({});
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
